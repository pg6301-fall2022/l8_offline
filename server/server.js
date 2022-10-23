import express from "express";
import * as path from "path";
import {MoviesApi} from "./moviesApi.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const app = express();

app.use(bodyParser.json());

const mongodburl = process.env.MONGODB_URL;
if(mongodburl) {
    const client = new MongoClient(mongodburl);
    client
        .connect()
        .then((conn) =>
        app.use("/api/movies",
            MovieApi(conn.db(process.env.MONGODB_DATABASE || "movie-reference "))
        )
    );
}

app.use("/api/movies", MoviesApi());

app.use(express.static("../client/dist"));
app.use((req, res, next) => {
   if(req.method === "GET" && !req.path.startsWith("/api")){
       return res.sendFile(path.resolve("../client/dist/index.html"));
   }  else {
       next();
   }
});

const server = app.listen(process.env.PORT || 3000,
    () => {console.log(`Server started on: http://localhost:${server.address().port}`)});