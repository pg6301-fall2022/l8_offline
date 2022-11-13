import React, { useContext, useState } from "react";
import {MovieApiContext} from "./movieApiContext.jsx";
import {useLoader} from "./useLoader.jsx";

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
    const [titleSearch, setTitleSearch] = useState("in");
    const [titleInput, setTitleInput] = useState("");
    const { loading, error, data } = useLoader(
        async () => await listMovies( titleSearch ),
        titleSearch
    );

    function handleSubmit(e){
        e.preventDefault();
        console.log("TitleInput: " + titleInput);
        setTitleSearch(titleInput);
    }

    if(loading) {
        return <div className="loading-indicator"> Still Loading... </div>;
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
                <form onSubmit={handleSubmit}>
                    <label> Search by title:
                    <input
                        id="search-spot"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                    />
                    <button> Search </button>
                    </label>
                </form>
            </div>
            {data.map((movie) => (
                <MovieCard key={movie.title} movie={movie} />
            ))}
        </div>
    );
}