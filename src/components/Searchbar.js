// styles
import { useState } from "react";
import "./Searchbar.css";
import {  useNavigate } from "react-router-dom";


export default function Searchbar() {

  const [item, setItem] = useState('');
  const navigate = new useNavigate()

  const handleSubmit = (e) =>{
    e.preventDefault()

    navigate(`/search?q=${item}`)
  }

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          onChange={(e) => setItem(e.target.value)}
          required
        />
      </form>
    </div>
  );
}