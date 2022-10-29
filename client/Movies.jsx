import * as React from "react";
import {BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {useContext, useState} from "react";
import { MovieApiContext } from "./movieApiContext.jsx";

import { useLoader } from "./useLoader.jsx";
import { AddMovie } from "./addMovie.jsx";

export function FrontPage() {
    return(
        <div>
            <h1> Back to the movies </h1>
            <ul>
                <li>
                    <Link to={"/movies/list"}> List Movies </Link>
                </li>
                <li>
                    <Link to={"/movies/new"}> Add new Movie </Link>
                </li>
            </ul>
        </div>
    );
}


function MovieCard( { movie: { title, plot, year } }) {
    return(
        <>
            <h3> {title} - {year} </h3>
            <div> {plot} </div>
        </>
    );
}


export function ListMovies() {
    const { listMovies } = useContext(MovieApiContext);
    const [year, setYear] = useState();
    const [yearInput, setYearInput] = useState("");
    const { loading, error, data } = useLoader(
        async () => listMovies(year),
        [year]
    );

    if(loading) {
        return <div className="loading-indicator"> Still Loading... </div>
    }

    if(error) {
        return (
            <div>
                <h1> Error </h1>
                <div className="error-message"> {error.toString()} </div>
            </div>
        );
    }

    return (
        <div>
            <h1> Movies to come back to: </h1>
            <div>
                <label> Search by year: </label>
                <input value={yearInput} onChange={(e) => setYearInput(e.target.value)} />
                <button onClick={() => setYear(yearInput)}> Search </button>
            </div>

            {data.map( (movie) => (
                <MovieCard key={movie.title} movie={movie} />
            ))}

        </div>
    );
}

export function Movies(){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies />} />
            <Route path={"/new"} element={<AddMovie />} />
        </Routes>
    );
}

export function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/movies/*"} element={<Movies />}/>
            </Routes>
        </BrowserRouter>
    );
}