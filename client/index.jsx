import * as React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {useEffect, useState} from "react";

const element = document.getElementById("app");
const root = createRoot(element);

function FrontPage() {
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

async function fetchJSON(url){
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error(`Loading error: ${res.status} -> ${res.statusText};`)
    }

    return await res.json();
}

function useLoader(loadingFunction){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    async function load(){
        try{
            setLoading(true);
            setData(await loadingFunction());
        }
        catch (error){
            setError(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => load(), []);

    return { loading, error, data };
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
                    <div key={movie.title}> {movie.title} </div>
                    ))}

        </div>
    );
}

function Movies(){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies />} />
            <Route path={"/new"} element={<h1> Add new Movie </h1>} />
        </Routes>
    );
}


function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<FrontPage />} />
                <Route path={"/movies/*"} element={<Movies />}/>
            </Routes>
        </BrowserRouter>
    );
}

//root.render(<h1> Greetings from React </h1>);

root.render(<Application />);