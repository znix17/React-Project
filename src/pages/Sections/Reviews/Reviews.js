import React from "react";
import "./Reviews.css";
import TestimonialCard from "../../../components/TestimonialCard/TestimonialCard";

const testimonials = [
  {
    id: 1,
    author: "Isabella Montgomery",
    description:
      "Little Lemon's Bruschetta is a symphony of flavors; perfectly crispy bread coupled with the freshest tomatoes.",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg",
    rating: 5,
  },
  {
    id: 2,
    author: "Alexander Thompson",
    description:
      "The burger at Little Lemon was a taste revelation with its juicy, perfectly cooked meat and harmonious ingredient pairing.",
    image:
      "https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg",
    rating: 5,
  },
  {
    id: 3,
    author: "Olivia Jenkins",
    description:
      "The Greek Salad at Little Lemon was delightfully fresh and flavorful, with a high-quality dressing. ",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 4,
  },
];

const Reviews = () => {
  return (
    <div className="review-background">
      <div className="reviews">
        <div className="reviews-container">
          <h1 className="review-title">Reviews</h1>
        </div>

        <div className="reviews-list">
          {testimonials.map((testimonial) => (
            <TestimonialCard
            
              key={testimonial.id}
              author={testimonial.author}
              description={testimonial.description}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
