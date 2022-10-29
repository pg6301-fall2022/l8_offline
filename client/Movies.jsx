import * as React from "react";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {useState} from "react";


import { useLoader } from "./useLoader.jsx";
import { fetchJSON } from "./fetchJSON.jsx";
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


export function ListMovies({ movieApi }) {
    const { loading, error, data } = useLoader(async () =>
        movieApi.listMovies()
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
            {
                data.map( (movie) => (
                    <MovieCard key={movie.title} movie={movie} />
                ))}

        </div>
    );
}

export function Movies({ movieApi }){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies movieApi={movieApi}/>} />
            <Route path={"/new"} element={<AddMovie movieApi={movieApi}/>} />
        </Routes>
    );
}

export function Application() {
    const movieApi = {
      async listMovies() {
        return fetchJSON("/api/movies");
      },
      async createMovie(movie){
        fetch("/api/movies",{
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
                <Route path={"/movies/*"} element={<Movies movieApi={movieApi}/>}/>
            </Routes>
        </BrowserRouter>
    );
}