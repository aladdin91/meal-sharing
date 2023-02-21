
const express = require("express");
const router = express.Router();
const knex = require("../database");


// Returns all reviews.
router.get('/', async (req, res) => {
  try {
    const all_reviews = await knex.select('*').from('review');
    all_reviews.length === 0 ? res.json({ "messege": " no reviews found" }) :
      res.json(all_reviews)
  } catch (err) {
    console.error(err);
    res.status(500).send(err)
  }
})

// Returns all reviews for a specific meal.




// Adds a new review to the database.
router.post('/', async (req, res) => {
  try {
    const new_review = req.body;
    await knex('review').insert(new_review)
    res.json({ "message": "review added successfully" })
  } catch (err) {
    console.error(err.sqlMessage);
    res.status(500).json(err.sqlMessage);
  }
});


// Returns a review by id.
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const review_id = await knex('review')
      .select('*')
      .where('id', id)
    review_id.length === 0 ?
      res.status(404).json({ "message": "no review found" }) :
      res.json(review_id);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
});


// Updates the review by id.
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await knex('review')
      .where({ id: id })
      .update(req.body)
    res.json({ "message": "review updated" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  };
});


// Deletes the review by id.
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRows = await knex('review').where({ id: id }).del();
    deletedRows > 0 ?
      res.status(200).json({ message: 'review deleted' }) :
      res.status(404).json({ message: 'review not found' });
  } catch (err) {
    console.error(err.sqlMessage);
    res.status(500).send(err.sqlMessage);
  }
});

module.exports = router;


