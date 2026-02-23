import React from "react";
import "./Popup.css";
import Button from "../Button/Button";

const Popup = ({ title, description, onClose, details }) => {
  return (
    <>
      <div data-testid="popup-background" className="popup-background" onClick={onClose}></div>
      <div className="popup">
        <h2 className="popup-title">{title}</h2>
        <p className="popup-description">{description}</p>
        {details && (
          <div className="popup-details">
            <h3>Reservation Details:</h3>
            <p><strong>Date:</strong> {details.date}</p>
            <p><strong>Time:</strong> {details.time}</p>
            <p><strong>Number of Guests:</strong> {details.people}</p>
            <p><strong>Occasion:</strong> {details.occasion}</p>
          </div>
        )}
        <div className="popup-button">
          <Button onClick={onClose} title="Close" />
        </div>
      </div>
    </>
  );
};

export default Popup;
