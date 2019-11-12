const express = require("express");
const app = express();
const router = express.Router();
const { Movie, validate } = require("../models/movie");

router.get("/", async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
});

module.exports = router;