import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MealContext } from "./MealContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ShowReviews from "./ShowReviews";
import ReservationForm from "./ReservationForm";
import PostReviewForm from "./PostReviewForm";
const mealsUrl = process.env.REACT_APP_MEALS_URL;

function MealDetail() {
  const { id } = useParams();
  const { meals } = useContext(MealContext);
  const meal = meals.find((meal) => meal.id === Number(id));

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
        {meal ? (
          <>
            <div className="meal-card">
              {meal.title === null ? (
                <h3>Title: not available</h3>
              ) : (
                <h3>Meal: {meal.title}</h3>
              )}
              {meal.description === null ? (
                <p>Description: not available</p>
              ) : (
                <p>Description: {meal.description}</p>
              )}
              {meal.price === null ? (
                <p>Price: not available</p>
              ) : (
                <p>Price: {meal.price} DKK</p>
              )}
              {meal.max_reservation === null ? (
                <p>Max reservation: not available</p>
              ) : (
                <p>Max reservation: {meal.max_reservation}</p>
              )}
              {meal.location === null ? (
                <p>Location: not available</p>
              ) : (
                <p>Location: {meal.location}</p>
              )}
              {reservationsList.total_guests === null ? (
                <p>number Of Guests: not available</p>
              ) : (
                <p>number Of Guests: {reservationsList.total_guests}</p>
              )}
              <p>
                Reservation left:
                {meal.max_reservation - reservationsList.total_guests}
              </p>
            </div>
            {meal.max_reservation <= reservationsList.total_guests ? (
              <p>sorry, no seat available</p>
            ) : (
              <div>
                <ReservationForm
                  meal={meal}
                  mealId={meal.id}
                  max_reservation={meal.max_reservation}
                  reservationsList={reservationsList}
                />
              </div>
            )}
          </>
        ) : (
          <p>Meal not found</p>
        )}
      </div>

      <div className="reviews-container">
        <h2>Reviws</h2>
        {mealReview.map((review) => (
          <ShowReviews key={review.id} review={review} />
        ))}
      </div>
      <div className="review-form">
        <PostReviewForm mealId={id} />
      </div>
      <Footer />
    </div>
  );
}

export default MealDetail;
