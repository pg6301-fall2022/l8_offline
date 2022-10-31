import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import * as React from "react";
import {useLoader} from "./useLoader.jsx";
import {fetchJSON} from "./fetchJSON.jsx";
import {useState} from "react";


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


function ListMovies() {
    const { loading, error, data } = useLoader(async () => {
        return fetchJSON("/api/movies");
    });

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
