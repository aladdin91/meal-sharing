import React, { useState, useContext } from "react";
import Button from "./Button";
const mealsUrl = process.env.REACT_APP_MEALS_URL;

const ReservationForm = ({ reservationsList, id }) => {
  const [postReservation, setPostReservation] = useState({
    id: "",
    number_of_guests: "",
    meal_id: id,
    created_date: "",
    contact_phonenumber: "",
    contact_name: "",
    contact_email: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${mealsUrl}reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postReservation),
      });
      if (!response.ok) {
        throw new Error("Failed to create reservation");
      }
      setSuccess(true);
      alert("Reservation created successfully!");
    } catch (err) {
      setError(err.message);
      alert(`Error: ${error}`);
    }
  };

  return (
    <>
      <form className="form-card" onSubmit={handleSubmit}>
        <label htmlFor="reservation-id">id</label>
        <input
          type="number"
          id="reservation-id"
          value={postReservation.id}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              id: event.target.value,
            })
          }
          required
        />
        <label htmlFor="number_of_guests">number of guests</label>
        <input
          min="1"
          max={
            reservationsList[0]?.max_reservation -
            reservationsList[0]?.total_guests
          }
          type="number"
          id="number_of_guests"
          value={postReservation.number_of_guests}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              number_of_guests: event.target.value,
            })
          }
          required
        />
        <label htmlFor="meal_id">meal id</label>
        <input
          type="number"
          id="meal_id"
          value={postReservation.meal_id}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              meal_id: event.target.value,
            })
          }
          required
        />
        <label htmlFor="created_date">created date</label>
        <input
          type="date"
          id="name"
          value={postReservation.created_date}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              created_date: event.target.value,
            })
          }
          required
        />
        <label htmlFor="contact_phonenumber">phone</label>
        <input
          type="text"
          id="name"
          value={postReservation.contact_phonenumber}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              contact_phonenumber: event.target.value,
            })
          }
          required
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={postReservation.contact_name}
          onChange={(event) =>
            setPostReservation({
              ...postReservation,
              contact_name: event.target.value,
            })
          }
          required
        />
        <Button title="Book seat" />
      </form>
    </>
  );
};

export default ReservationForm;
