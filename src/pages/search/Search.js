import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import "./Search.css";

function searchRecipes(recipes, query) {
  // Convert the query and all relevant fields to lowercase
  const lowercaseQuery = query.toLowerCase();
  return recipes.filter((recipe) => {
    const { title, ingredients, method } = recipe;
    const lowercaseTitle = title.toLowerCase();
    const lowercaseIngredients = ingredients.join(" ").toLowerCase();
    const lowercaseMethod = method.toLowerCase();

    // Check if the lowercase query is present in any of the relevant fields
    return (
      lowercaseTitle.includes(`${lowercaseQuery}`) ||
      lowercaseIngredients.includes(`${lowercaseQuery}`) ||
      lowercaseMethod.includes(`${lowercaseQuery}`)
    );
  });
}

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes";
  const { error, isPending, data } = useFetch(url);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (data) {
      const results = searchRecipes(data, query);
      setSearchResults(results);
    }
  }, [data, query]);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {searchResults.length > 0 ? (
        <RecipeList recipes={searchResults} />
      ) : (
        <p>No recipes found for "{query}"</p>
      )}
    </div>
  );
}
