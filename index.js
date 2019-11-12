const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Movie = require("./models/movie");
const movies = require("./routes/movies");
const genres = require('./routes/genres');

mongoose.connect("mongodb://localhost:27017/movies-rent", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => { console.log("connected to movies-rent... "); })
    .catch((err) => console.log('Problemm in connecting to the database'));

//middlewares
app.use(express.json());

app.use("/api/movies", movies);
app.use("/api/genres", genres);

app.listen('3000', () => {
    console.log("listening on port 3000...");
});