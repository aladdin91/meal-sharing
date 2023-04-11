import React, { useContext, useState, useEffect } from "react";
import SearchMeals from "./SearchMeals";
import Meal from "./Meal";
import { MealContext } from "./MealContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SortMenu from "./SortMenu";

function MealList() {
  const { meals } = useContext(MealContext);
  const [sortedMeals, setSortedMeals] = useState(meals);
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    const sortFunction = (a, b) => {
      if (sortOption === "price-low") {
        return a.price - b.price;
      } else if (sortOption === "price-high") {
        return b.price - a.price;
      } else if (sortOption === "max_reservations-low") {
        return a.max_reservation - b.max_reservation;
      } else if (sortOption === "max_reservations-high") {
        return b.max_reservation - a.max_reservation;
      } else if (sortOption === "when-new") {
        const dateA = new Date(a.when);
        const dateB = new Date(b.when);
        return dateB - dateA;
      } else if (sortOption === "when-old") {
        const dateA = new Date(a.when);
        const dateB = new Date(b.when);
        return dateA - dateB;
      } else {
        return 0;
      }
    };
    const sorted = [...meals].sort(sortFunction);
    setSortedMeals(sorted);
  }, [meals, sortOption]);

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
  };

  return (
    <div>
      <Navbar />
      <SearchMeals />
      <h2>List of meals</h2>
      <SortMenu onSortChange={handleSortChange} />
      <div className="container">
        {sortedMeals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default MealList;
