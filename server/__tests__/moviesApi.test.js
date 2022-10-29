import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import { MoviesApi } from "../moviesApi.js";
import dotenv from "dotenv";


const app = express();
app.use(bodyParser.json());

describe("movies api test suite", () => {
    it("does something", async () => {
       const agent = request.agent(app);
       const response = await agent
           .get("/api/movies");

       expect(response.status).toEqual(200);
    });
});