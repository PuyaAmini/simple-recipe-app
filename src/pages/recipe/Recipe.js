import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectFirestore } from "../../firebase/config";

// styles
import "./Recipe.css";
import { useTheme } from "../../hooks/useTheme";

export default function Recipe() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  const { mode } = useTheme();

  useEffect(() => {
    setIsPending(true);

    const unSub =projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("could not find recipe..");
        }
      });
      //real time listening :O
      return () => unSub()
  }, [id]);
  //the "id" will not change but we have to add it for the sake of warnings
  const handleClick = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: `edited title just for example`,
    });
  };
  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleClick}>Update</button>
        </>
      )}
    </div>
  );
}
