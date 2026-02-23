import React from "react";
import "./FoodCard.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import pages from "../../tools/pages";

const FoodCard = ({ title, description, image, price }) => {
  const navigate = useNavigate();

  const onDeliveryClick = () => {
    // redirect to the Orders/Coming soon page
    navigate(pages.get("orders").path);
  };

  return (
    <div className="food-card">
      <div className="food-card-image">
        <img src={image} alt="food" height={200}></img>
      </div>
      <div className="food-card-body">
        <div className="food-card-body-header">
          <div className="food-card-body-title-header">
            <p className="food-card-title">{title}</p>
            <p className="food-card-price">{price}</p>
          </div>
          <p className="food-card-description">{description}</p>
        </div>

        <div className="food-card-delivery">
          <Button
            title={"Order delivery"}
            onClick={onDeliveryClick}
            type="button"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
