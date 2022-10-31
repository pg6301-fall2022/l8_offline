import * as React from "react";
import { createRoot } from "react-dom/client";
import { Application } from "./movies.js";

const element = document.getElementById("app");
const root = createRoot(element);




//root.render(<h1> Greetings from React </h1>);

root.render(<Application />);