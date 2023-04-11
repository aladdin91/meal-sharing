import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import img from "../assets/images/food.png";

function Meal({ meal }) {
  return (
    <div className="meal-card">
      <img className="food-img" src={img} alt="food imege" />
      {meal.title === null ? (
        <h3>Title: not available</h3>
      ) : (
        <h3 className="meal-title">Title: {meal.title}</h3>
      )}
      {meal.description === null ? (
        <p> Description: not available</p>
      ) : (
        <p> Description: {meal.description}</p>
      )}
      {meal.price === null ? (
        <p>Price: not available</p>
      ) : (
        <p>Price: {meal.price} DKK</p>
      )}
      {meal.max_reservation - meal.total_guests <= 0 ? (
        <p> Reservation left: completed</p>
      ) : (
        <p>
          Reservation left:
          {meal.max_reservation - meal.total_guests}
        </p>
      )}
      <Link to={`/meal/${meal.id}`}>
        <Button title="Reserve meal" />
      </Link>
    </div>
  );
}

export default Meal;
