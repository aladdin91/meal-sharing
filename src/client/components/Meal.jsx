import React from "react";
import "./meal.css";
function Meal({ meal }) {
  return (
    <div className="meal-card">
      <h3>{meal.title}</h3>
      <p>{meal.description}</p>
      <p>Price: {meal.price} DKK</p>
    </div>
  );
}

export default Meal;
