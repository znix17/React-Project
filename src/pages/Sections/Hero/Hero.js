import React from "react";
import "./Hero.css";
import Button from "../../../components/Button/Button";
import Image from "../../../assets/restaurantchef.jpg";
import { useNavigate } from "react-router-dom";
import pages from "../../../tools/pages";

const Hero = () => {
  const navigate = useNavigate();
  const onClickReserve = () => {
    navigate(pages.get("reservations").path);
  }

  return (
    <div className="hero-background">
      <div className="hero">
        <div>
          <h1 className="title">Little Lemon</h1>
          <h2 className="subtitle">Chicago</h2>
          <p>
           Little Lemon is a family-owned Mediterranean restaurant offering fresh seasonal dishes, online reservations, and a warm dining experience. We are committed to providing exceptional service and delicious food in a cozy atmosphere. Join us for a memorable dining experience!
          </p>
          <Button title={"Reserve a table"} onClick={onClickReserve} />
        </div>

        <img
          className="image"
          src={Image}
          alt="Restaurant food"
          height={200}
          width={200}
        />
      </div>
    </div>
  );
};

export default Hero;
