const express = require("express");
const app = express();
const router = express.Router();
const { Genre, validGenre } = require("../models/genre");

router.get("/", (req, res) => {
    res.send("genres here");
});

router.post("/", async (req, res) => {

    const { error } = validGenre(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = new Genre({
        name: req.body.name
    });

    const result = genre.save();
    res.send(result);
});

module.exports = router;
