import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import testimonials from "../../../public/review.json";
const Review = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testimonials.map(({ id, name, image, review, rating }) => (
        <div
          key={id}
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-4">
            <img
              className="rounded-full mr-4"
              src={image}
              alt={name}
              width={64}
              height={64}
            />

            <div>
              <h3 className="text-lg font-semibold">{name}</h3>
              <div className="flex text-yellow-400">
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 italic">
            <FaQuoteLeft className="inline mr-2 text-gray-400" />
            {review}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Review;
