import * as React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";

import { FrontPage } from "../movies.js";
import {MemoryRouter} from "react-router-dom";

describe("basic client test suite", () => {
   it("sample test", () => {
        const element = document.createElement("div");
        const root = createRoot(element);

        act(() =>
            root.render(
                <MemoryRouter>
                    <FrontPage />
                </MemoryRouter>
            )
        );

        expect(element.querySelector("h1")?.innerHTML).toEqual(" Back to the movies ");

   }) ;
});