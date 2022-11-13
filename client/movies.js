import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import * as React from "react";
import {useLoader} from "./useLoader.jsx";
import {fetchJSON} from "./fetchJSON.jsx";
import {useState} from "react";

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


function ListMovies({ movieApi }) {
    const { loading, error, data } = useLoader(async () =>
        movieApi.listMovies()
    );

    if(loading) {
        return <div> Still Loading... </div>
    }

    if(error) {
        return (
            <div>
                <h1> Error </h1>
                <div> {error.toString()} </div>
            </div>
        );
    }

    console.log(data);

    return (
        <div>
            <h1> Movies to come back to: </h1>
            {
                data.map( (movie) => (
                    <div key={movie.title}> <h1> {movie.title} -> ({movie.year}) </h1>
                        <div>
                            {movie.plot}
                        </div>
                    </div>
                ))}

        </div>
    );
}


export function Movies({ moviesApi }){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies movieApi={moviesApi} />} />
            <Route path={"/new"} element={<AddMovie movieApi={moviesApi}/>} />
        </Routes>
    );
}

export function Application() {
    const movieApi = {
        async listMovies() {
            return fetchJSON("/api/movies");
        },
        async createMovie( movie ){
            fetch("/api/movies", {
                method: "post",
                body: JSON.stringify(movie),
                headers:{
                    "content-type": "application/json",
                },
            });
        },
    };

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/movies/*"} element={<Movies moviesApi={movieApi} />}/>
            </Routes>
        </BrowserRouter>
    );
}
