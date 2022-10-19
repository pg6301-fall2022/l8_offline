import * as React from "react";
import { createRoot } from "react-dom";

const element = document.getElementById("app");
const root = createRoot(element);

root.render(<h1> Greetings from React </h1>);