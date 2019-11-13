const express = require("express");
const app = express();
const router = express.Router();
const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");

app.use(express.json());

router.get("/", async (req, res) => {
    const movies = await Movie.find();
    res.send(movies);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const movie = await Movie.findById(id);

    if (!movie) {
        return res.status(404).send("No movie with this id");
    }

    return res.send(movie);

});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    const movie = await Movie.findByIdAndRemove(id);

    if (!movie) return res.status(404).send("the movie to delete does not exist");

    return res.send(movie);

});

router.post("/", async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genreId = req.body.genreId;
    const genre = await Genre.findById(genreId);

    let movie = new Movie({
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();

    res.send(movie);
});

router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const id = req.params.id;

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(404).send("Not a valid genre");

    const movie = await Movie.findByIdAndUpdate(id, {
        id: req.body._id,
        title: req.body.title,
        genre: genre,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if (!movie) return res.status(404).send("The movie with the given id was not found");
    return res.send(movie);
});

module.exports = router;