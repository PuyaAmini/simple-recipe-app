import React from "react";

// styles:
import "./RecipeList.css";
import { Link } from "react-router-dom";

export default function RecipeList({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className="card" key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <React.Fragment>{recipe.method.substring(0, 100)}...</React.Fragment>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
