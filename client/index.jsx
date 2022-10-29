import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";
import { Application } from "./Movies.js";

const element = document.getElementById("app");
const root = createRoot(element);






//root.render(<h1> Greetings from React </h1>);

root.render(<Application />);