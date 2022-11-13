import React from "react";
import { fetchJSON } from "./fetchJSON.jsx";

export const MovieApiContext = React.createContext({
    async listMovies(title){
        return await fetchJSON(`/api/movies?titleSearch=${title}`);
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