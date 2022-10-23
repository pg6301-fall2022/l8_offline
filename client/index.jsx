import * as React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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


function ListMovies() {
    const { loading, error, data } = ""; // get the current status

    if(loading) {
        return <div> Still Loading... </div>
    }

    if(error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    return (
      <div>
          <h1> Movies to get back to: </h1>
          {data.map((movie) => (
              <div key={movie.title}> {movie.title} </div>
          ))}
      </div>
    );
}

function Movies(){
    return(
        <Routes>
            <Route path={"/list"} element={<h1> List Movies </h1>} />
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