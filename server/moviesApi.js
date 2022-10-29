import express from "express";

export function MoviesApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {
        const { year } = req.query;
        console.log(req.query);
        const filter = {};
        //console.log(`year is ${year}`);

        if(year!=='undefined'){
            const yearInt = parseInt(year);
            filter.year = {year : { $gte: yearInt } };
        }

        console.log(filter);

        const movies = await db
            .collection("movies")
            .find(filter)
            .map(({ title, year, plot }) => ({ title, year, plot }))
            .limit(100)
            .toArray();
        //console.log(movies);
        res.json(movies);
    });

    api.post("/", (req, res) => {
        const { title, year, plot } = req.body;

        db.collection("movies").insertOne({ title, year, plot });

        res.sendStatus(204);
    });

    return api;
}
