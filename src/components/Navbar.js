import { Link } from "react-router-dom";
import React from "react";

//component
import Searchbar from "./Searchbar";

// styles:
import "./Navbar.css";
import { useTheme } from "../hooks/useTheme";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to={"/"} className="brand">
          <h1>Ninja Ricetta</h1>
        </Link>
        <Searchbar />
        <Link to={"/create"}>Create Recipe</Link>
      </nav>
    </div>
  );
}
