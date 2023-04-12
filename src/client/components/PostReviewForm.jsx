import React, { useState, useContext } from "react";
import { MealContext } from "./MealContext";
import Button from "./Button";
const mealsUrl = process.env.REACT_APP_MEALS_URL;
const PostReviewForm = ({ mealId }) => {
  const [postReviewForm, setPostReviewForm] = useState({
    id: "",
    title: "",
    meal_id: mealId,
    description: "",
    created_date: "",
    stars: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { meals } = useContext(MealContext);
  const meal = meals.find((meal) => meal.id === Number(mealId));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${mealsUrl}reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ meal_id: mealId, ...postReviewForm }),
      });
      if (!response.ok) {
        throw new Error("Failed to post review");
      }
      setSuccess(true);
      alert("Review posted successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit}>
        {/* i have to incloud id because the database does not increse the
        value, i will fix it later :) */}
        <label htmlFor="revew-id">id</label>
        <input
          type="number"
          id="review-id"
          value={postReviewForm.id}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              id: event.target.value,
            })
          }
          required
        />
        <label htmlFor="meal-id">meal-id</label>
        <input
          type="number"
          id="meal-id"
          value={postReviewForm.meal_id}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              meal_id: event.target.value,
            })
          }
          required
        />
        <label htmlFor="created-date">created date</label>
        <input
          type="date"
          id="name"
          value={postReviewForm.created_date}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              created_date: event.target.value,
            })
          }
          required
        />
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={postReviewForm.title}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              title: event.target.value,
            })
          }
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={postReviewForm.description}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              description: event.target.value,
            })
          }
          required
        />
        <label htmlFor="stars">Stars</label>
        <input
          type="number"
          min="1"
          max="5"
          id="stars"
          value={postReviewForm.stars}
          onChange={(event) =>
            setPostReviewForm({
              ...postReviewForm,
              stars: event.target.value,
            })
          }
          required
        />
        <Button title="Post Review" />
      </form>
    </>
  );
};

export default PostReviewForm;
