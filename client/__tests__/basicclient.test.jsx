import * as React from "react"
import {createRoot} from "react-dom";

import { FrontPage } from "../index.jsx"

describe("client test suite", () =>{

    it("basic test", () => {
       const element = document.createElement("div");

       const root = createRoot(element);

       act( () => {
           root.render(
           <FrontPage />
           )
       });


       expect(element.querySelector("h1")?.innerHTML).toEqual(" Back to the movies ");

    });

});