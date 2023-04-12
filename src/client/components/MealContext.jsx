import React, { createContext, useState, useEffect } from "react";
const mealsUrl = process.env.REACT_APP_MEALS_URL;

const MealContext = createContext(null);

function MealContextProvider({ children }) {
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
    <MealContext.Provider value={{ meals }}>{children}</MealContext.Provider>
  );
}
export { MealContextProvider, MealContext };
