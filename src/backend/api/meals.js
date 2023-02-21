const express = require("express");
const { join } = require("path");
const router = express.Router();
const knex = require("../database");

router.get("/", async(req, res) => {
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

module.exports = router;