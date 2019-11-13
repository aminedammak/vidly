const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 255,
        trim: true
    }
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
    const schema = {
        name: Joi.string().required().min(3).max(255)
    }

    return Joi.validate(genre, schema);

}

exports.Genre = Genre;
exports.validGenre = validateGenre;
exports.genreSchema = genreSchema;