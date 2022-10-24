import * as React from "react";
import { createRoot } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route,
    Link, useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";


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

async function fetchJSON(url, options = {}){
    const res = await fetch(url, {
        method: options.method || "get",
        headers: options.json ? {"content-type" : "application/json"} : {},
        body: options.json && JSON.stringify(options.json),
    });

    if(!res.ok) {
        throw new Error(`Loading error: ${res.status} -> ${res.statusText};`)
    }

    if(res.status === 200){
        return await res.json();
    }
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


function Movies(){
    return(
        <Routes>
            <Route path={"/list"} element={<ListMovies />} />
            <Route path={"/new"} element={<AddMovie />} />
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