import React, { useContext } from "react";

import Meal from "./Meal";
import { MealContext } from "./MealContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MealList() {
  const { meals } = useContext(MealContext);
  return (
    <div>
      <Navbar />
      <h2>List of meals</h2>
      <div className="container">
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MealList;
