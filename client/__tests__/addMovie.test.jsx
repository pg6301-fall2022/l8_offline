import * as React from "react";
import * as ReactDOM from "react-dom"
import {createRoot} from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { AddMovie } from "../addMovie.jsx";
import { MemoryRouter } from "react-router-dom";
import {fetchJSON} from "../fetchJSON.jsx";

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
                <AddMovie movieApi={{ createMovie }} />
            </MemoryRouter>
            )
       );

       act ( () =>
       Simulate.change(element.querySelector("form input"), {
          target: { value: "Movie Title" },
       }));

        act ( () =>
            Simulate.submit(element.querySelector("form"))
        );

       expect(createMovie).toBeCalledWith({
          title: "Movie Title",
          year: "",
          plot: "",
       });

    });
});