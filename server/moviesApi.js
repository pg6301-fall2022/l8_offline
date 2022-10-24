import express from "express";

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

        db.collection("movies").insertOne({ title, year, plot });

        res.sendStatus(204);
    });

    return api;
}
