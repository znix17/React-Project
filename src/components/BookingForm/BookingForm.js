import React, { useState } from "react";
import Button from "../Button/Button";
import "./BookingForm.css";

const BookingForm = ({
  onFormSubmit,
  isFormSubmitted,
  availableTimes,
  dispatchOnDateChange
}) => {
  const [formValues, setFormValues] = useState({
    date: "",
    time: "",
    people: "1",
    occasion: "birthday",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (availableTimes.length > 0 && !formValues.time) {
      setFormValues((prev) => ({
        ...prev,
        time: availableTimes[0],
      }));
    }
  }, [availableTimes]);

  const handleInputChange = (e) => {
    if (e.target.name === 'date') {
      dispatchOnDateChange(e.target.value);
    }
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const minGuest = 1;
  const maxGuest = 10;

  const handleSubmit = (e) => {
    e.preventDefault();

    const missing = [];
    if (!formValues.date) missing.push("Date");
    if (!formValues.time) missing.push("Time");
    const peopleNum = Number(formValues.people);
    if (!formValues.people || isNaN(peopleNum) || peopleNum < minGuest || peopleNum > maxGuest) {
      missing.push(`Number of people (must be ${minGuest}-${maxGuest})`);
    }
    if (!formValues.occasion) missing.push("Occasion");

    if (missing.length > 0) {
      window.alert("Please complete: " + missing.join(", "));
      return;
    }

    // forward to parent when all client-side validations pass
    onFormSubmit(e, formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="reservation-container">
        <label htmlFor="date" className="containter-item-title">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formValues.date}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.date ? "error" : ""}
        />
        {isFormSubmitted && !formValues.date && (
          <div className="error-text">Please select a date</div>
        )}
      </div>
      <div className="reservation-container">
        <label htmlFor="time" className="containter-item-title">
          Time
        </label>
        <select
          id="time"
          name="time"
          value={formValues.time}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.time ? "error" : ""}
        >
          {availableTimes.length === 0 ? (
            <option value="">Loading times...</option>
          ) : (
            availableTimes.map(time => 
              <option key={time} value={time}>
                {time}
              </option>
            )
          )}
        </select>
      </div>
      <div className="reservation-container">
        <label htmlFor="people" className="containter-item-title">
          Number of people
        </label>
        <input
          type="number"
          id="people"
          name="people"
          value={formValues.people}
          min={minGuest}
          max={maxGuest}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.people ? "error" : ""}
        />
        {isFormSubmitted && (!formValues.people || Number(formValues.people) < minGuest) && (
          <div className="error-text">Enter number of people between {minGuest} and {maxGuest}</div>
        )}
      </div>
      <div className="reservation-container">
        <label htmlFor="occasion" className="containter-item-title">
          Occasion
        </label>
        <select
          id="occasion"
          name="occasion"
          value={formValues.occasion}
          onChange={handleInputChange}
          className={isFormSubmitted && !formValues.occasion ? "error" : ""}
        >
          <option value="birthday">Birthday</option>
          <option value="anniversary">Anniversary</option>
          <option value="business">Business</option>
          <option value="other">Other</option>
        </select>
        {isFormSubmitted && !formValues.occasion && (
          <div className="error-text">Please select an occasion</div>
        )}
      </div>
      <div className="reservation-button">
        <Button title="Book a table" type="submit" />
      </div>
    </form>
  );
};

export default BookingForm;
