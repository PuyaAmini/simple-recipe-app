import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipeList from '../../components/RecipeList';

import Fuse from 'fuse.js';

//style
import './Search.css';
function searchRecipes(recipes , query){
  const fuse = new Fuse(recipes , {
    keys:['title', 'ingredients', 'method'],
    includeMatches:true,
  })
  return fuse.search(query).map(({item}) => item)
}

export default function Search() {
  const queryString = useLocation().search;
  const queryParams = new URLSearchParams(queryString);
  const query = queryParams.get('q');

  const url = 'http://localhost:3000/recipes';
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