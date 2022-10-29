import React from "react";
import * as router from "react-router";
import {createRoot} from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { AddMovie } from "../addMovie.jsx";


const navigate = jest.fn()

beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe("add movie tests", () => {
    it("shows form", async () => {
       const element = document.createElement("div");
       const root = createRoot(element);

       await act(async () => {
           root.render(<AddMovie />);
       });
       expect(element.innerHTML).toMatchSnapshot();

       const inputLabels = Array.from(
           element.querySelectorAll("form label strong")
       ).map((label) => label.innerHTML);
       expect(inputLabels).toEqual(["Title: ", "Year: ", "Plot: "]);
    });

    it("submits form", async () => {
       const createMovie = jest.fn();

       const element = document.createElement("div");
       const root = createRoot(element);

       await act( async () =>
            root.render(<AddMovie movieApi={{createMovie}} />)
       );

       Simulate.change(element.querySelector("form input"), {
          target: {value: "Movie Title" },
       });
       Simulate.submit(element.querySelector("form"));

       expect(createMovie).toBeCalledWith({
          title: "Movie Title",
          year: "",
          plot: "",
       });

    });
});