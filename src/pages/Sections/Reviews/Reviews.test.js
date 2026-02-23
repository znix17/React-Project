import React from "react";
import { render, screen } from "@testing-library/react";
import Reviews from "./Reviews";

describe("Reviews component", () => {
  test("renders the testimonial cards", () => {
    render(<Reviews />);
    
    // Check if the testimonial cards are rendered
    const testimonialCards = screen.getAllByTestId("testimonial-card");
    expect(testimonialCards).toHaveLength(3);
  });
});
