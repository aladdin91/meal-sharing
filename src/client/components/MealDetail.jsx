import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { MealContext } from "./MealContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ShowReviews from "./ShowReviews";
import ReservationForm from "./ReservationForm";
import PostReviewForm from "./PostReviewForm";
const mealsUrl = process.env.REACT_APP_MEALS_URL;

function MealDetail() {
  const { id } = useParams();
  // const { meals } = useContext(MealContext);
  // const meal = meals.find((meal) => meal.id === Number(id));

  const [reservationsList, setReservationsList] = useState([]);
  const [mealReview, setMealReview] = useState([]);

  useEffect(() => {
    try {
      async function fetchReservations() {
        const response = await fetch(`${mealsUrl}meals/${id}/reservation`);
        const data = await response.json();
        setReservationsList(data);
      }
      fetchReservations();
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    try {
      async function fetchMealReview() {
        const response = await fetch(`${mealsUrl}reviews/meal/${id}`);
        const data = await response.json();
        setMealReview(data);
      }
      fetchMealReview();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="meal-cont">
        {reservationsList.length >= 1 ? (
          <>
            <div className="meal-card">
              {reservationsList[0]?.title === null ? (
                <h3>Title: not available</h3>
              ) : (
                <h3>Meal: {reservationsList[0]?.title}</h3>
              )}
              {reservationsList[0]?.description === null ? (
                <p>Description: not available</p>
              ) : (
                <p>Description: {reservationsList[0]?.description}</p>
              )}
              {reservationsList[0]?.price === null ? (
                <p>Price: not available</p>
              ) : (
                <p>Price: {reservationsList[0]?.price} DKK</p>
              )}
              {reservationsList[0]?.max_reservation === null ? (
                <p>Max reservation: not available</p>
              ) : (
                <p>Max reservation: {reservationsList[0]?.max_reservation}</p>
              )}
              {reservationsList[0]?.location === null ? (
                <p>Location: not available</p>
              ) : (
                <p>Location: {reservationsList[0]?.location}</p>
              )}
              {reservationsList[0]?.total_guests === null ? (
                <p>number Of Guests: not available </p>
              ) : (
                <p>number Of Guests: {reservationsList[0]?.total_guests}</p>
              )}
              <p>
                {" "}
                Reservation left:{" "}
                {reservationsList[0]?.max_reservation -
                  reservationsList[0]?.total_guests}
              </p>
            </div>
            {reservationsList[0]?.max_reservation <=
            reservationsList[0]?.total_guests ? (
              <p>sorry, no seat available</p>
            ) : (
              <div>
                <ReservationForm id={id} reservationsList={reservationsList} />
              </div>
            )}
          </>
        ) : (
          <p>Meal not found</p>
        )}
      </div>

      <div className="reviews-container">
        <div className="reviews-details">
          <h2>Reviews</h2>
          {mealReview.message ? (
            <p>no reviews found for this meal</p>
          ) : (
            <div className="reviews-details">
              {mealReview.map((review) => (
                <ShowReviews key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="review-form">
        <PostReviewForm id={id} />
      </div>
      <Footer />
    </div>
  );
}

export default MealDetail;
