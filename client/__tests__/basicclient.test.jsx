import * as React from "react"
import {createRoot} from "react-dom/client";
import { act } from "react-dom/test-utils";

import {Movies, FrontPage, Application, ListMovies} from "../Movies.jsx";

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

describe("client test suite", () => {

    it("basic test", () => {
        const element = document.createElement("div");
        const root = createRoot(element);

        act(() => root.render(
            <Application/>
        ));
        expect(element.querySelector("h1")?.innerHTML).toEqual(" Back to the movies ");

    });

    it("show loading screen", () => {
        const element = document.createElement("div");
        const root = createRoot(element);

        act(() => root.render(
            <ListMovies movieApi={{listMovies: () => movies}}/>
        ));

        expect(element.querySelector(".loading-indicator")).not.toBeNull();
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows movies list", async () => {
        const element = document.createElement("div");
        const root = createRoot(element);

        await act(async () => {
            root.render(
                <ListMovies movieApi={{listMovies: () => movies}}/>
            );
        });

        expect(element.querySelector("h3").innerHTML).toEqual(` ${movies[0].title} - ${movies[0].year} `);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("shows error message", async () => {
        const element = document.createElement("div");
        const root = createRoot(element);

        await act(async () => {
            root.render(
                <ListMovies
                    movieApi={{
                        listMovies: () => {
                            throw new Error("Failed to fetch");
                        },
                    }}/>
            );
        });

        expect(element.querySelector(".error-message").innerHTML)
            .toContain("Failed to fetch");
        expect(element.innerHTML).toMatchSnapshot();

    });
});