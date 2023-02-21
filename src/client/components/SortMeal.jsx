import React, { useState } from "react";

function SortMeal({ onSortChange }) {
  const [sortKey, setSortKey] = useState("");

  const handleSortKeyChange = (event) => {
    const newSortKey = event.target.value;
    setSortKey(newSortKey);
    onSortChange(newSortKey);
  };

  return (
    <div>
      <label htmlFor="sort-key">Sort by:</label>
      <select id="sort-key" value={sortKey} onChange={handleSortKeyChange}>
        <option value="">Sort by</option>
        <option value="price-low">Price -- Low to High</option>
        <option value="price-high">Price -- High to Low</option>

        <option value="max_reservations-low">
          Max Reservations -- Low to High
        </option>
        <option value="max_reservations-high">
          Max Reservations -- High to Low
        </option>
        <option value="when-new">Date -- newst</option>
        <option value="when-old">Date -- oldest</option>
      </select>
    </div>
  );
}

export default SortMeal;
