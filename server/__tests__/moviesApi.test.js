import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { MoviesApi } from "../moviesApi.js";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";


const app = express();
app.use(bodyParser.json());
let mongoClient;

beforeAll(async () => {
    dotenv.config();
    mongoClient = new MongoClient(process.env.MONGODB_URL);
    await mongoClient.connect();
    const database = mongoClient.db("unit_tests");
    await database.collection("movies").deleteMany({});
    app.use("/api/movies", MoviesApi(database));
});

afterAll(() => {
    mongoClient.close();
});

describe("movies api test suite", () => {
    it("does something", async () => {
       const agent = request.agent(app);
       const response = await agent
           .get("/api/movies");

       expect(response.status).toEqual(200);
    });
});