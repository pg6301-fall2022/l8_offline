import express from "express";

export function MoviesApi(db){
    const api = express.Router();

    api.get("/", async (req, res) => {
        //console.log(req.query);
        //console.log(req);
        const { titleSearch } = req.query;
        const filter = {};
        //console.log(`year is ${year}`);

        if(titleSearch!=='undefined' && titleSearch!=='' && titleSearch){
            //console.log("Title: " + titleSearch);
            //console.log(titleSearch!=='undefined');
            //filter.year = {year : { $gte: yearInt } };
            //filter.year = {$regex: /2.*/};
            //filter.title = {$regex: "(.*)" + input + "(.*)", $options: 'i'};
            filter.title = {$regex: "(.*)" + titleSearch + "(.*)", $options: 'i'}
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
