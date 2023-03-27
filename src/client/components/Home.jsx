import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MealContext } from "./MealContext";
import Meal from "./Meal";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Button from "./Button";

function Home() {
  const { meals } = useContext(MealContext);

  return (
    <div>
      <Navbar />
      <h2>Featured meals</h2>
      <div className="container">
        {meals.slice(0, 3).map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </div>
      <Link to="/meals">
        <Button title="See more" />
      </Link>
      <Footer />
    </div>
  );
}
export default Home;
