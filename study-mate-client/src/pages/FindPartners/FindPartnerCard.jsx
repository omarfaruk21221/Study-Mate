import React from "react";
import { FaStar, FaUser } from "react-icons/fa";
import { Link } from "react-router";
const FindPartnerCard = ({ Partner }) => {
  // { name:'omar faruk', subject:'math', rating:'5', imgUrl:""}
  console.log(Partner);
  const { _id, name, profileimage, subject, experienceLevel, studyMode } =
    Partner || {};
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

      <h3 className="text-2xl font-semibold text-primary mb-1">{name}</h3>
      <p className="text-xl mb-2">{subject}</p>
      {/* Rating */}
      <div className="e-full flex items-center justify-between gap-7 my-2">
        <aside>
          <p className="bg-green-500 py-1 px-3 rounded-3xl"> {studyMode}</p>
        </aside>
        <aside>
          <p className="bg-yellow-500 py-1 px-3 rounded-3xl">
            {" "}
            {experienceLevel}
          </p>
        </aside>
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

export default FindPartnerCard;
