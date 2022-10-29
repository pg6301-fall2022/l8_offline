import * as React from "react"
import {createRoot} from "react-dom/client";
import { act } from "react-dom/test-utils";
import { MovieApiContext } from "../movieApiContext.jsx";

import { ListMovies } from "../Movies.jsx";

const movies = [
    {
        title: "Test movie 1",
        plot: "We test stuff",
        year: "2022"
    },
    {
        title: "Test movie 2",
        plot: "we test more stuff",
        year: "2022"
    }
]

async function renderListMovies(listMovies) {
    const element = document.createElement("div");
    const root = createRoot(element);

    await act(async () =>
        root.render(
            <MovieApiContext.Provider value={{ listMovies }}>
                <ListMovies />
            </MovieApiContext.Provider>
        )
    );
    return element;
}

describe("client test suite", () => {

    it("show loading screen", async () => {
        const element = await renderListMovies(() => new Promise(() => {}));

        expect(element.querySelector(".loading-indicator")).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows movies list", async () => {
        const element = await renderListMovies(async () => movies);

        expect(element.querySelector("h3").innerHTML).toEqual(` ${movies[0].title} - ${movies[0].year} `);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows error message", async () => {
        const element = await renderListMovies(async () => {
           throw new Error("Failed to fetch");
        });

        expect(element.querySelector(".error-message").innerHTML)
            .toContain("Failed to fetch");
        expect(element.innerHTML).toMatchSnapshot();

    });
});