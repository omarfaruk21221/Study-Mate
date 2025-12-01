// TopPartnerCard.jsx
import React from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const PartnerCard = ({ Partner }) => {
  // { name:'omar faruk', subject:'math', rating:'5', imgUrl:""}
  console.log(Partner);
  const { _id, name, profileimage, subject, rating } = Partner || {};
  return (
    <div className="w-xs mb-10 bg-base-100 rounded-lg shadow-md p-6 flex flex-col items-center hover:scale-115 hover:bg-accent  transition-transform cursor-pointer">
      <figure>
        {profileimage ? (
          <img
            src={profileimage}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-4   border-primary"
          />
        ) : (
          <FaUser className="w-24 h-24 rounded-full object-cover mb-4 border-4   border-primary" />
        )}
      </figure>

      <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
      <p className=" mb-2">
        <span className="font-semibold">Subject:</span> <span>{subject}</span>
      </p>
      {/* Rating */}
      <div className="flex items-center gap-1 text-yellow-500 my-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-gray-700 text-sm font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
      <Link
        to={`/partner-details/${_id}`}
        className="mt-4 btn btn-primary hover:btn-primary text-white rounded-md font-semibold transition"
      >
        View Profile
      </Link>
    </div>
  );
};

export default PartnerCard;
