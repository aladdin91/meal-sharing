import React, { useState, useContext, useEffect } from "react";
import SearchResult from "./SearchResult";
import { MealContext } from "./MealContext";

function SearchMeals() {
  const { meals, setMeals } = useContext(MealContext);
  const [searchMeals, setSearchMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        `http://localhost:5000/api/meals/?title=${searchQuery}`
      );
      const data = await response.json();
      setSearchMeals(data);
    };

    if (searchQuery) {
      fetchMeals();
    } else {
      setSearchMeals([]);
    }
  }, [searchQuery, searchFocused]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (!searchFocused) {
      setSearchFocused(true);
    }
  };
  const handleSearchFocus = (e) => {
    setSearchFocused(true);
  };
  const handleSearchBlur = (e) => {
    setSearchFocused(false);
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
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
      </div>
      <div className="container">{mealList}</div>
    </div>
  );
}
export default SearchMeals;
