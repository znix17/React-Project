import React from "react";
import "./UnderConstruction.css";
import Logo from "../../../assets/Logo.svg";

const UnderConstruction = () => {
  return (
    <div className="under-construction" data-testid="under-construction">
      <img src={Logo} alt="Little Lemon logo" className="construction-logo" />
      <h1 className="construction-title">Coming soon!</h1>
    </div>
  );
};

export default UnderConstruction;
