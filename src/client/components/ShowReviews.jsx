import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function ShowReviews({ review }) {
  const starIcons = [];

  for (let i = 0; i < review.stars; i++) {
    starIcons.push(<FontAwesomeIcon key={i} icon={faStar} />);
  }
  return (
    <>
      <h3>
        Title: {review.title} <span>{starIcons}/5</span>
      </h3>
      <p>Comment: {review.description}</p>
    </>
  );
}

export default ShowReviews;
