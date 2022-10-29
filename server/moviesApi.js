import express from "express";


export function MoviesApi(db) {
    const api = express.Router();
    console.log(db)
    api.get("/", async (req, res) => {

        //filter goes here?

        const movies = await db
            .collection("movies")
            .find({})
            .map(({ title, plot, year }) => ({ title, plot, year }))
            .toArray();

        res.json(movies);
    });

    api.post("/", (req, res) => {
        const { title, plot, year } = req.body;

        db.collection("movies").insertOne({ title, plot, year });
        res.sendStatus(204);
    });
    return api;
}