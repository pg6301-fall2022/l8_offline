import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchJSON} from "./fetchJSON.jsx";
import * as React from "react";


function FormInput( {value, label, onChangeValue} ){
    return(
      <div>
          <label>
              <strong>
                  {label}
              </strong>
              <input value={value} onChange={(e) => onChangeValue(e.target.value)} />
          </label>
      </div>
    );
}

export function AddMovie({ movieApi }){
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        movieApi.createMovie({title, year, plot});

        setTitle("");
        setYear("");
        setPlot("");
        navigate("/");
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1> Submit new movie </h1>
            <FormInput label={"Title"} value={title} onChangeValue={setTitle}/>
            <FormInput label={"Year"} value={year} onChangeValue={setYear} />
            <FormInput label={"Plot"} value={plot} onChangeValue={setPlot} />
            <button> Submit </button>
        </form>
    );
}

