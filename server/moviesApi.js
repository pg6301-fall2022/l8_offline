import express from "express";

export const MoviesApi = express.Router();

// temporary local storage
const movies = [
    {
        title : "Plan 9",
        year: "1957",
        plot: "confused",
    },
    {
        title: "Dune",
        year: "2021",
        plot: "Arrakis, Dune, desert planet"
    },

];

MoviesApi.get("/", (req, res) => {
   res.json(movies);
});

MoviesApi.post("/", (req, res) => {
    const { title, plot, year } = req.body;
    movies.push( { title, plot, year });
    res.sendStatus(204);
});