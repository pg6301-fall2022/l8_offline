import express from "express";

export function MoviesApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {

        const movies = await db
            .collection("movies")
            .find(
                // {year: {$in: [/^196.*/]}}  // pattern
                // {year: {$regex: /2.*/}}     // regex
                {}
            ).limit(100)
            //.findOne(
            //    {
            //        $or: [
            //            { 'title' : /^T/ },
            //            { 'year' : /^2/}
            //        ]
            //    }
            //);
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
