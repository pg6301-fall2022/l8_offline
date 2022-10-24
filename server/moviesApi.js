import express from "express";


const movies = [
    {
        title: "Plan 9",
        plot: "trick question?",
        year: "1957",
    },
    {
        title: "Dune",
        year: "2021",
        plot: "Arrakis, Dune, desert planet... ",
    },
]


export function MoviesApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {

        const movies = await db
            .collection("movies")
            .find({})
            .map(({ title, year, plot }) => ({ title, year, plot }))
            .toArray();

        res.json(movies);
    });

    api.post("/", (req, res) => {
        const { title, year, plot } = req.body;

        movies.push({ title, year, plot });

        res.sendStatus(204);
    });

    return api;
}
