import * as React from "react";
import {useNavigate} from "react-router-dom";
import { useContext, useState } from "react";
import { MovieApiContext } from "./movieApiContext.jsx";


function FormInput({value, label, onChangeValue}) {
    return(
      <div>
          <label>
              <strong>{label} </strong>
              <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
          </label>
      </div>
    );
}

export function AddMovie(){
    const { createMovie } = useContext(MovieApiContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [yearInput, setYearInput] = useState("");
    const [plot, setPlot] = useState("");


    async function handleSubmit(e){
        e.preventDefault();
        const year = parseInt(yearInput);
        createMovie({ title, year, plot });
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> Submit new movie </h1>
            <FormInput label="Title:" value={title} onChangeValue={setTitle}/>
            <FormInput label="Year:" value={yearInput} onChangeValue={setYearInput}/>
            <FormInput label="Plot:" value={plot} onChangeValue={setPlot}/>
            <button> Submit </button>
        </form>
    );
}

