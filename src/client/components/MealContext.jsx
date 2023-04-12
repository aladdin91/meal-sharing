import React, { createContext, useState, useEffect } from "react";
const mealsUrl = process.env.REACT_APP_MEALS_URL;

const MealContext = createContext(null);

function MealContextProvider({ children }) {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    try {
      async function fetchMeals() {
        const response = await fetch(`${mealsUrl}meals/meals/details`);
        const data = await response.json();
        setMeals(data);
      }
      fetchMeals();
    } catch (err) {
      console.error(err);
    }
  }, []);

  console.log(meals);
  return (
    <MealContext.Provider value={{ meals, setMeals }}>
      {children}
    </MealContext.Provider>
  );
}
export { MealContextProvider, MealContext };
