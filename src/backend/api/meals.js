const express = require("express");
const { join } = require("path");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
    try {
        let query = knex.select("*").from("meal");
        const {
            maxPrice,
            availableReservations,
            title,
            dateAfter,
            dateBefore,
            limit,
            sortDir,
            sortKey
        } = req.query
        // Returns all meals that are cheaper than maxPrice
        if (maxPrice) {
            query = query.where('price', '<=', maxPrice)
        }
        // Returns all meals that still have available spots left
        if (availableReservations === 'true') {
            query = query.select('meal.*', knex.raw('(meal.max_reservation - COALESCE(SUM(reservation.number_of_guests), 0)) as available_slot'))
                .leftJoin('reservation', 'meal.id', '=', 'reservation.meal_id')
                .groupBy('meal.id', 'meal.max_reservation', 'meal.title', 'meal.when', 'meal.description', 'meal.location', 'meal.created_date', 'meal.price', 'reservation.id')
                .having('meal.max_reservation', '<=', knex.raw('(COALESCE(SUM(reservation.number_of_guests), 0))'));
        } else if (availableReservations === 'false') {
            query = query.select('meal.*', knex.raw('(meal.max_reservation - COALESCE(SUM(reservation.number_of_guests), 0)) as available_slot'))
                .leftJoin('reservation', 'meal.id', '=', 'reservation.meal_id')
                .groupBy('meal.id', 'meal.max_reservation', 'meal.title', 'meal.when', 'meal.description', 'meal.location', 'meal.created_date', 'meal.price', 'reservation.id')
                .having('meal.max_reservation', '>=', knex.raw('(COALESCE(SUM(reservation.number_of_guests), 0))'));
        }
        // Returns all meals that partially match the given title
        if (title) {
            query = query.where("meal.title", "like", `%${title}%`);
        }
        // Returns all meals where the date for when is after the given date.
        if (dateAfter) {
            query = query.where('when', '>', dateAfter);
        }
        // Returns all meals where the date for when is before the given date.
        if (dateBefore) {
            query = query.where('when', '<', dateBefore);
        }
        // Returns the given number of meals.
        if (limit) {
            query = query.limit(limit);
        }
        // Returns all meals sorted by the given key and direction
        if (sortDir && sortDir === 'asc' || sortDir === 'desc') {

            if (sortKey && (sortKey === 'price' || sortKey === 'when' || sortKey === 'max_reservations')) {
                query = query.orderBy(sortKey, sortDir);
            }
        }
        const sql = query.toString();
        const meals = await query;
        res.json(meals);
    } catch (error) {
        throw error;
    }
});

router.get("/:meal_id/reviews", async (req, res) => {
    const meal_id = req.params.meal_id;
    try {
        const reviewById = await knex("meal")
            .join("review", "review.meal_id", "=", "meal.id")
            .where({ meal_id });
        res.json(reviewById);
    } catch (error) {
        throw error;
    }
});

// Returns all meals
router.get('/', async (req, res) => {
    try {
        const all_meals = await knex.select('*').from('meal');
        all_meals.length === 0 ?
            res.json({ "message": "no meal found" }) :
            res.json(all_meals);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


// Adds a new meal to the database
router.post('/', async (req, res) => {
    try {
        const new_meal = req.body;
        await knex('meal').insert(new_meal)
        res.json({ "message": "meal added successfully" })
    } catch (err) {
        console.error(err.sqlMessage);
        res.status(500).json(err.sqlMessage);
    }
});


// Returns the meal by id
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const mail_id = await knex('meal')
            .select('*')
            .where('id', id)
        mail_id.length === 0 ?
            res.status(404).json({ "message": "no meal found" }) : res.json(mail_id);

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };
});

// Updates the meal by id
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await knex('meal')
            .where({ id: id })
            .update(req.body)

        res.json({ "message": "Meal updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    };
});

// Deletes the meal by id

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedRows = await knex('meal').where({ id: id }).del();
        deletedRows > 0 ?
            res.status(200).json({ message: 'meal deleted' }) :
            res.status(404).json({ message: 'meal not found' });
    } catch (err) {
        console.error(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
    }
});

router.get('/:id/reservation', async (req, res) => {
    const id = req.params.id;
    try {
        const totalGuests = await knex('meal')
            .join('reservation', 'meal.id', '=', 'reservation.meal_id')
            .select('meal.id', 'meal.title', knex.raw('SUM(reservation.number_of_guests) as total_guests'))
            .where('meal.id', id)
            .groupBy('meal.id', 'meal.title');
        res.json(totalGuests[0]);
    } catch (error) {
        throw error;
    }
});


module.exports = router;
