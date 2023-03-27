import React from "react";

function ShowReviews({ review }) {
  return (
    <>
      <h3>
        Title: {review.title} <span>{review.stars}/5</span>
      </h3>
      <p>Comment: {review.description}</p>
    </>
  );
}

export default ShowReviews;
