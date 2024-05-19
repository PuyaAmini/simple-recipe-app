import React, { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";
import { supabase } from "../../firebase/config";

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const { data: Recipes, error } = await supabase.from("Recipes")
        .select('*');
        if (error) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          console.log(Recipes);
          setRecipes(Recipes);
          setIsPending(false);
        }
      } catch (err) {
        setError(err.message);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Caricamento...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
