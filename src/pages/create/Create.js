import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// styles
import "./Create.css";
import { useTheme } from "../../hooks/useTheme";
//hooks and components
import { useFetch } from "../../hooks/useFetch";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  // export new ingredient
  const [newIngredient, setNewIngredient] = useState("");
  // ingredients list
  const [ingredients, setIngredients] = useState([]);
  //for focus again on input after enter new ingredients
  const ingredientsInput = useRef(null);

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  // navigate to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      //from useFetch : const json = await res.json(); setData(json);
      navigate("/");
    }
  }, [data]);

  //add ingredient input func
  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    // if it wasn't  repetitive
    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevIngredients) => [...prevIngredients, ing]);
    }
    setNewIngredient("");
    //focus on input again
    ingredientsInput.current.focus();
  };
  const { mode } = useTheme();

  return (
    <div>
      <div className={`create ${mode}`}>
        <h2 className="page-title">Add a new Recipe</h2>
        <form onSubmit={handleSubmit}>
          {/* add title */}
          <label>
            <span>Recipe Title:</span>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>

          {/* add ingredients */}
          <label>
            <span>Recipe Ingredients:</span>
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientsInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </label>

          {/* show  recently added ingredients */}
          <p>
            Current ingredients: {""}
            {ingredients.map((i) => (
              <em key={i}>{i} , </em>
            ))}
          </p>

          {/* add method */}
          <label>
            <span>Recipe Method:</span>
            <textarea
              onChange={(e) => setMethod(e.target.value)}
              value={method}
              required
            />

            {/* add cooking time */}
            <label>
              <span>Cooking Time:</span>
              <input
                type="number"
                onChange={(e) => setCookingTime(e.target.value)}
                value={cookingTime}
                required
              />

              {/* Submit */}
              <button className="btn">Invia</button>
            </label>
          </label>
        </form>
      </div>
      <p className="space"></p>
    </div>
  );
}
