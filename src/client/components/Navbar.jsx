import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <ul className="nav">
      <li className="navLink">
        <Link to="/">Home</Link>
      </li>
      <li className="navLink">
        <Link to="/meals">More Meals</Link>
      </li>
    </ul>
  );
}

export default Navbar;
