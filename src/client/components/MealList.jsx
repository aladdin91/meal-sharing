import React, { useState, useEffect } from "react";

import Meal from "./Meal";
import "./meal.css";

const mealsUrl = process.env.REACT_APP_MEALS_URL;

function MealList() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    try {
      async function fetchMeals() {
        const response = await fetch(`${mealsUrl}meals`);
        const data = await response.json();

        setMeals(data);
      }
      fetchMeals();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <h2>List of meals</h2>

      <div className="continer">
        {meals.length > 0 ? (
          meals.map((meal) => <Meal key={meal.id} meal={meal} />)
        ) : (
          <p>Loading meals...</p>
        )}
      </div>

    </div>
  );
}

export default MealList;
