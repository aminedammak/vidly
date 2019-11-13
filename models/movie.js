const Joi = require('joi');
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, minLength: 2, maxLength: 255 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0 },
    dailyRentalRate: { type: Number, required: true, min: 0 }
});

const Movie = mongoose.model("Movie", movieSchema);

const validateMovie = (movie) => {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;