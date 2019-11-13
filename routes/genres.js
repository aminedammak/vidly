const express = require("express");
const app = express();
const router = express.Router();
const { Genre, validGenre } = require("../models/genre");

router.post("/", async (req, res) => {

    const { error } = validGenre(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

router.get("/", async (req, res) => {
    const genres = await Genre.find();
    return res.send(genres);
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const genre = await Genre.findById(id);

    if (!genre) return res.status(404).send('Get problem: The genre with the given id is not found');

    return res.send(genre);
});

router.delete("/:id", async (req, res) => {

    const id = req.params.id;

    const movie = await Genre.findByIdAndRemove(id);

    if (!movie) return res.status(404).send("Delete problem: The genre with the given id was not found");
    return res.send(movie);
});

router.put("/:id", async (req, res) => {

    const { error } = validGenre(req.body);
    if (error) return res.status(400).send("JOY validation : Bad request");

    const id = req.params.id;

    const genre = await Genre.findByIdAndUpdate(id, {
        name: req.body.name
    }, { new: true });

    if (!genre) return res.status(404).send("Put pb: the genre with the given id was not found");

    return res.send(genre);

});

module.exports = router;
