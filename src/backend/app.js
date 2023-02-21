const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("./database");

const mealsRouter = require("./api/meals");
const reservationsRouter = require('./api/reservations');

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);



app.get("/", (req, res) => {
    res.send("working");
});

//Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async(req, res) => {
    try {
        const [future_meals] = await knex.raw("SELECT meal.title, meal.when FROM meal WHERE `when` > DATE(NOW())");
        future_meals.length != 0 ? res.json({ future_meals }) : res.json({
            "message": "there is no meal available",
        })
    } catch (err) {
        console.error(err.sqlMessage)
        res.send(err.sqlMessage)
    }
});

//Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async(req, res) => {
    try {
        const [past_meals] = await knex.raw("SELECT meal.title, meal.when FROM meal WHERE `when` < DATE(NOW())");
        past_meals.length != 0 ? res.json({ past_meals }) : res.json({
            "message": "there is no meal available",
        })
    } catch (err) {
        console.error(err.sqlMessage)
        res.send(err.sqlMessage)
    }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async(req, res) => {
    try {
        const [all_meals] = await knex.raw("SELECT * FROM meal;");
        all_meals.length != 0 ? res.json({ all_meals }) : res.json({ "message": "there is no meal available", })
    } catch (err) {
        console.error(err.sqlMessage)
        res.send(err.sqlMessage)
    }
});

//Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async(req, res) => {
    try {
        const [first_meals] = await knex.raw("SELECT * FROM meal LIMIT 1;");
        first_meals.length != 0 ? res.json({ first_meals }) : res.json({ "message": "there is no meal available", })
    } catch (err) {
        console.error(err.sqlMessage)
        res.send(err.sqlMessage)
    }
});

//Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async(req, res) => {
    try {
        const [last_meals] = await knex.raw("SELECT * FROM meal  ORDER BY id DESC LIMIT 1;");
        last_meals.length != 0 ? res.json({ last_meals }) : res.json({ "message": "there is no meal available", })
    } catch (err) {
        console.error(err.sqlMessage)
        res.send(err.sqlMessage)
    }
});

if (process.env.API_PATH) {
    app.use(process.env.API_PATH, router);
} else {
    throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
    res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;