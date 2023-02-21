const express = require("express");
const router = express.Router();
const knex = require("../database");


// Returns all reservations

router.get('/', async (req, res) => {
  try {
    const all_reservation = await knex.select('*').from('reservation');
    all_reservation.length === 0 ?
      res.json({ "message": "no reservation found" }) :
      res.json(all_reservation);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Adds a new reservation to the database
router.post('/', async (req, res) => {
  try {
    const new_reservation = req.body;
    await knex('reservation').insert(new_reservation)
    res.json({ "message": "reservation added successfully" })
  } catch (err) {
    console.error(err.sqlMessage);
    res.status(500).json(err.sqlMessage);
  }

router.get('/', async(req, res) => {
    try {
        const all_reservation = await knex.select('*').from('reservation');
        all_reservation.length === 0 ?
            res.json({ "message": "no reservation found" }) :
            res.json(all_reservation);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Adds a new reservation to the database
router.post('/', async(req, res) => {
    try {
        const new_reservation = req.body;
        await knex('reservation').insert(new_reservation)
        res.json({ "message": "reservation added successfully" })
    } catch (err) {
        console.error(err.sqlMessage);
        res.status(500).json(err.sqlMessage);
    }
});


// Returns a reservation by id

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const reservation_id = await knex('reservation')
      .select('*')
      .where('id', id)
    reservation_id.length === 0 ?
      res.status(404).json({ "message": "no meal found" }) :
      res.json(reservation_id);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
router.get('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const reservation_id = await knex('reservation')
            .select('*')
            .where('id', id)
        reservation_id.length === 0 ?
            res.status(404).json({ "message": "no meal found" }) :
            res.json(reservation_id);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    };

});


// Updates the reservation by id

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await knex('reservation')
      .where({ id: id })
      .update(req.body)

    res.json({ "message": "reservation updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  };

router.put('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        await knex('reservation')
            .where({ id: id })
            .update(req.body)

        res.json({ "message": "reservation updated" });
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    };
});



// Deletes the reservation by id
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRows = await knex('reservation').where({ id: id }).del();
    deletedRows > 0 ?
      res.status(200).json({ message: 'reservation deleted' }) :
      res.status(404).json({ message: 'reservation not found' });
  } catch (err) {
    console.error(err.sqlMessage);
    res.status(500).send(err.sqlMessage);
  }
router.delete('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const deletedRows = await knex('reservation').where({ id: id }).del();
        deletedRows > 0 ?
            res.status(200).json({ message: 'reservation deleted' }) :
            res.status(404).json({ message: 'reservation not found' });
    } catch (err) {
        console.error(err.sqlMessage);
        res.status(500).send(err.sqlMessage);
    }
});



module.exports = router;