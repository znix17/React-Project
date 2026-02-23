import React from "react";
import Hero from "../Sections/Hero/Hero";
import Specials from "../Sections/Specials/Specials";
import CustomerReview from "../Sections/CustomerReview/CustomerReview";
import About from "../Sections/About/About";

const Home = () => {
  return (
    <>
      <Hero />
      <Specials />
      <CustomerReview />
      <About />
    </>
  );
};
export default Home;
