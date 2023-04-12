import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

function SearchResult({ meal }) {
  return (
    <div className="meal-card">
      {meal.title === null ? (
        <h3>Title: not available</h3>
      ) : (
        <h3 className="meal-title">Title: {meal.title}</h3>
      )}
      {meal.price === null ? (
        <p>Price: not available</p>
      ) : (
        <p>Price: {meal.price} DKK</p>
      )}

      <Link to={`/meal/${meal.id}`}>
        <Button title="Reserve meal" />
      </Link>
    </div>
  );
}

export default SearchResult;
