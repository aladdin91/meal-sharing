import React, { useState, useContext } from "react";

import Button from "./Button";
const mealsUrl = process.env.REACT_APP_MEALS_URL;
const PostReviewForm = ({ id }) => {
  const [postReviewForm, setPostReviewForm] = useState({
    title: "",
    meal_id: id,
    description: "",
    created_date: "",
    stars: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${mealsUrl}reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postReviewForm),
      });
      if (!response.ok) {
        throw new Error("Failed to post review");
      }
      setSuccess(true);
      setError(null);
      alert("Review posted successfully!");
    } catch (err) {
      setSuccess(false);
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit}>
        <label htmlFor="created-date">created date</label>
        <input
          type="date"
          id="created-date"
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
