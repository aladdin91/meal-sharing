import React from "react";
import "./meal.css";
function Meal({ meal }) {
  const { title, description, price } = meal;
  return (
    <div className="meal-card">
      <h3>Title: {title}</h3>
      <p>Description: {description}</p>
      <p>Price: {price} DKK</p>
    </div>
  );
}

export default Meal;
