import React from "react";
import { fetchJSON } from "./fetchJSON.jsx";

export const MovieApiContext = React.createContext({
    async listMovies(year){
        return fetchJSON(`/api/movies?year=${year}`);
    },
    async createMovie(movie){
      fetch("/api/movies", {
          method: "post",
          body: JSON.stringify(movie),
          headers: {
            "content-type": "application/json",
          },
      });
    },
});