import React, { useState, useEffect } from "react";
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
      {meals.map((meal) => (
        <div key={meal.id}>
          <h3>title: {meal.title}</h3>
          <p>description: {meal.description}</p>
          <p>price: {meal.price}</p>
        </div>
      ))}
    </div>
  );
}

export default MealList;
