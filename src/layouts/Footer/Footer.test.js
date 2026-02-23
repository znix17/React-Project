import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders the Footer component with correct links and contact information", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    //logo
    const logoElement = screen.getByAltText("logo-footer");
    expect(logoElement).toBeInTheDocument();

    // map links 
    const homeLink = screen.getByText("Home");
    const aboutLink = screen.getByText("About");
    const menuLink = screen.getByText("Menu");
    const reservationsLink = screen.getByText("Reservations");
    const orderOnlineLink = screen.getByText("Order Online");
    const loginLink = screen.getByText("Login");

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(reservationsLink).toBeInTheDocument();
    expect(orderOnlineLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();

 
    const contactInfo = screen.getAllByText(
      /123-456-7890|little.lemon@lemon.com/
    );
    expect(contactInfo).toHaveLength(2);
    const facebookLink = screen.getByText("Facebook");
    const instagramLink = screen.getByText("Instagram");
    const twitterLink = screen.getByText("Twitter");

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });
});
