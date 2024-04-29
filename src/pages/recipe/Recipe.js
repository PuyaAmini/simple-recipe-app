// styles
import "./Recipe.css";

import React from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";

export default function Recipe() {
  const { id } = useParams();
  // {id} = in App.js    <Route path='/recipe/:id' element={<Recipe/>}/>
  const url = "http://localhost:3000/recipes/" + id;
  const { data: recipe, isPending, error } = useFetch(url);
  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Caricamento...</p>}
      {recipe && <h1>{recipe.title}</h1>}
    </div>
  );
}
