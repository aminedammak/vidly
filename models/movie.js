const Joi = require('joi');
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true, minLength: 2, maxLength: 255 },
    numberInStock: { type: Number, required: true, min: 0 },
    dailyRentalRate: { type: Number, required: true, min: 0 }
});

const Movie = mongoose.model("Movie", movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    };

    return Joi.validate(movie, schema);
}

module.exports = Movie;
exports.validate = validateMovie;