import React from "react";
import {useTheme} from '../hooks/useTheme'

// styles:
import "./RecipeList.css";
import { Link } from "react-router-dom";

export default function RecipeList({ recipes }) {
  const {mode} = useTheme()
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div className={`card ${mode}`} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <snap>{recipe.method.substring(0, 100)}...</snap>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
