import * as React from "react";
import {createRoot} from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { AddMovie } from "../addMovie.jsx";
import { MemoryRouter } from "react-router-dom";
import { MovieApiContext } from "../movieApiContext.jsx";

describe("add movie tests", () => {
    it("shows form", async () => {
       const element = document.createElement("div");
       const root = createRoot(element);

       await act(async () => {
           root.render(
            <MemoryRouter>
                <AddMovie />
            </MemoryRouter>
           );
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
            root.render(
            <MemoryRouter>
                <MovieApiContext.Provider value={{ createMovie }}>
                    <AddMovie />
                </MovieApiContext.Provider>
            </MemoryRouter>
            )
       );

       act ( () =>
       Simulate.change(element.querySelector("form div:nth-of-type(1) input"), {
          target: { value: "Movie Title" },
       }));

       act( () =>
        Simulate.change(element.querySelector("form div:nth-of-type(2) input"), {
            target: { value: "2022" },
        }));

        act ( () =>
            Simulate.submit(element.querySelector("form"))
        );

       expect(createMovie).toBeCalledWith({
          title: "Movie Title",
          year: 2022,
          plot: "",
       });

    });
});