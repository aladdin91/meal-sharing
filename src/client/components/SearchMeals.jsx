import React, { useState, useContext, useEffect } from "react";
import SearchResult from "./SearchResult";
import { MealContext } from "./MealContext";

function SearchMeals() {
  const { meals, setMeals } = useContext(MealContext);
  const [searchMeals, setSearchMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/meals/?title=${searchQuery}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        setSearchMeals(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("clean up function run");
        } else {
          throw error;
        }
      }
    };

    if (searchQuery) {
      fetchMeals();
    } else {
      setSearchMeals([]);
    }
    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let mealList;
  if (!searchQuery.length === 0) {
    mealList = meals.map((meal) => <SearchResult key={meal.id} meal={meal} />);
  } else if (searchMeals.length > 0) {
    mealList = searchMeals.map((meal) => (
      <SearchResult key={meal.id} meal={meal} />
    ));
  } else if (searchQuery.length > 0) {
    mealList = <p>No results found for "{searchQuery}" </p>;
  }
  return (
    <div>
      <div className="search-input-container">
        <input
          className="search-input"
          type="text"
          placeholder="search meals"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">{mealList}</div>
    </div>
  );
}
export default SearchMeals;
