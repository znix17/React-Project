import React from "react";
import "./CustomerReview.css";
import TestimonialCard from "../../../components/TestimonialCard/TestimonialCard";

const customerReviews = [
  {
    id: 1,
    author: "Sam",
    description: "Great!",
    image:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-3763188.jpg&fm=jpg",
    rating: 5,
  },
  {
    id: 2,
    author: "Mia",
    description: "Yum!",
    image:
      "https://www.irreverentgent.com/wp-content/uploads/2018/03/Awesome-Profile-Pictures-for-Guys-look-away2.jpg",
    rating: 5,
  },
  {
    id: 3,
    author: "Liam",
    description: "Delicious!",
    image:
      "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    rating: 4,
  },
];

const CustomerReview = () => {
  return (
    <div className="testimonial-background">
      <div className="testimonials">
        <div className="testimonials-container">
          <h1 className="testimonial-title">Customer Reviews</h1>
        </div>

        <div className="testimonials-list">
          {customerReviews.map((review) => (
            <TestimonialCard
            
              key={review.id}
              author={review.author}
              description={review.description}
              image={review.image}
              rating={review.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
