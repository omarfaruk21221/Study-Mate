import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";

const studyModeStyle = {
  online: "bg-green-500 text-white",
  offline: "bg-blue-500 text-white",
  hybrid: "bg-purple-500 text-white",
};

const levelStyle = {
  beginner: "bg-yellow-400 text-black",
  intermediate: "bg-orange-400 text-black",
  advanced: "bg-red-500 text-white",
};

const FindPartnerCard = ({ Partner }) => {
  const { _id, name, profileimage, subject, experienceLevel, studyMode } =
    Partner || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.5 }}
      className=" mb-10 bg-base-100 rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-accent cursor-pointer"
    >
      <figure>
        {profileimage ? (
          <motion.img
            whileHover={{ rotate: 3 }}
            src={profileimage}
            alt={name}
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary"
          />
        ) : (
          <FaUser className="w-24 h-24 rounded-full mb-4 border-4 border-primary" />
        )}
      </figure>

      <h3 className="text-lg font-semibold text-primary">{name}</h3>
      <p className="text-sm">{subject}</p>

      {/* Mode & Level */}
      <div className="flex gap-3 my-2">
        <motion.p
          whileHover={{ scale: 1.1 }}
          className={`py-1 px-3 rounded-3xl text-xs font-semibold ${
            studyModeStyle[studyMode] || "bg-gray-300 text-black"
          }`}
        >
          {studyMode}
        </motion.p>

        <motion.p
          whileHover={{ scale: 1.1 }}
          className={`py-1 px-3 rounded-3xl text-xs font-semibold ${
            levelStyle[experienceLevel] || "bg-gray-300 text-black"
          }`}
        >
          {experienceLevel}
        </motion.p>
      </div>

      <motion.div whileTap={{ scale: 0.95 }}>
        <Link
          to={`/partner-details/${_id}`}
          className="mt-3 btn btn-primary btn-sm text-white"
        >
          View Profile
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default FindPartnerCard;
