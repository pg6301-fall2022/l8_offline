import express from "express";

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

export function MoviesApi() {
    const api = express.Router();

    api.get("/", (req, res) => {
        res.json(movies);
    });

    api.post("/", (req, res) => {
        const { title, plot, year } = req.body;
        movies.push( { title, plot, year });
        res.sendStatus(204);
    });
    return api;
}