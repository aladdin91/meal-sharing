import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-container">
      <p className="logo">Meal sharing</p>

      <ul className="nav-ul">
        <li className="navLink">
          <Link to="/">Home</Link>
        </li>
        <li className="navLink">
          <Link to="/meals">More Meals</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
