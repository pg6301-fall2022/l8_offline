import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {useState} from "react";
import * as React from "react";

import { useLoader } from "./useLoader.jsx";
import { fetchJSON } from "./fetchJSON.jsx";

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

function AddMovie(){
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();

        await fetchJSON("/api/movies", {
            method: "post",
            json: { title, year, plot },
        });

        setTitle("");
        setYear("");
        setPlot("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> Submit new movie </h1>
            <div>
                Title:
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                Year:
                <input value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
            <div>
                Plot:
                <textarea value={plot} onChange={(e) => setPlot(e.target.value)} />
            </div>
            <button> Submit </button>
        </form>
    );
}


export function Movies({ movieApi }){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies movieApi={movieApi}/>} />
            <Route path={"/new"} element={<AddMovie />} />
        </Routes>
    );
}

export function Application() {
    const movieApi = {
      async listMovies() {
        return fetchJSON("/api/movies");
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