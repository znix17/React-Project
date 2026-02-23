// Reservations.js
import React, { useState } from "react";
import "./Reservations.css";
import BookingForm from "../../components/BookingForm/BookingForm";
import Popup from "../../components/Popup/Popup";
import { useNavigate } from "react-router-dom";
import pages from "../../tools/pages";
import { useReducer } from "react";
import { fetchAPI } from "../../tools/Api";

const Reservations = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [reservationDetails, setReservationDetails] = useState(null);

  const handleFormSubmit = (e, formValues) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    
    console.log("Form values:", formValues);
    console.log("Form values entries:", Object.entries(formValues));
    
    const areAllFieldsFilled = Object.values(formValues).every(
      (value) => value
    );
    
    console.log("All fields filled:", areAllFieldsFilled);

    if (areAllFieldsFilled) {
      setReservationDetails(formValues);
      setIsPopupVisible(true);
    }
  };

  const updateTimes = (availableTimes, date) => {
    const response = fetchAPI(new Date(date));
    return response.length !== 0 ? response : availableTimes;
  };

  const initializeTimes = (initialAvailableTimes) => [
    ...initialAvailableTimes,
    ...fetchAPI(new Date()),
  ];

  const [availableTimes, dispatchOnDateChange] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  return (
    <div data-testid="reservations-component" className="reservation">
      <div className="reservation-card">
        <h1 className="reservation-title">Table reservation</h1>
        <BookingForm
          availableTimes={availableTimes}
          dispatchOnDateChange={dispatchOnDateChange}
          onFormSubmit={handleFormSubmit}
          isFormSubmitted={isFormSubmitted}
        />
      </div>

      {isPopupVisible && (
        <Popup
          onClose={() => {
            setIsPopupVisible(false);
            navigate(pages.get("home").path);
          }}
          title="Your reservation is successful!"
          description="Thank you for choosing Little Lemon!"
          details={reservationDetails}
        />
      )}
    </div>
  );
};

export default Reservations;
