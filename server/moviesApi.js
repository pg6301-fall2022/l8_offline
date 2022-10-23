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

export function MoviesApi(db) {
    const api = express.Router();
    console.log(db)
    api.get("/", async (req, res) => {
        //res.json(movies);
        console.log(db);
        const collection = await db.collection("movies");
        console.log(collection);
        const movies = await db
            .collection("movies")
            .find({})
            .map(({ title, plot }) => ({ title, plot }))
            .toArray();

        res.json(movies);
    });

    api.post("/", (req, res) => {
        const { title, plot, year } = req.body;
        movies.push( { title, plot, year });
        res.sendStatus(204);
    });
    return api;
}