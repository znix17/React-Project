import React from "react";
import { render, screen } from "@testing-library/react";
import CustomerReview from "./CustomerReview";

describe("CustomerReview component", () => {
  test("renders the customer review cards", () => {
    render(<CustomerReview />);
    
    // Check if the testimonial cards are rendered
    const testimonialCards = screen.getAllByTestId("testimonial-card");
    expect(testimonialCards).toHaveLength(3);
  });
});
