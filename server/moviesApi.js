import express from "express";

export const MoviesApi = express.Router();

const movies = [
    {
        title: "Plan 9",
    },
    {
        title: "Dune",
    },
]

MoviesApi.get("/", (req, res) => {
    res.json(movies);
});
