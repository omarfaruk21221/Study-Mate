import React from "react";
import { motion } from "framer-motion";

const StatisticsCard = ({ stat, index }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const hoverVariants = {
    initial: {
      y: 0,
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    hover: {
      y: -10,
      boxShadow: "0 20px 25px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        delay: index * 0.1 + 0.1,
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      animate="visible"
      className="h-full"
    >
      <motion.div
        className={`card bg-base-100 shadow-lg h-full border border-base-300 hover:border-primary/50 transition-colors overflow-hidden`}
        variants={hoverVariants}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`}
        />

        <div className="card-body flex flex-col items-center text-center p-6 md:p-8">
          {/* Icon */}
          <motion.div
            className="text-5xl md:text-6xl mb-4"
            variants={iconVariants}
          >
            {stat.icon}
          </motion.div>

          {/* Value */}
          <motion.div
            className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
            variants={numberVariants}
          >
            {stat.value}
          </motion.div>

          {/* Title */}
          <h3 className="text-lg md:text-xl font-semibold text-base-content mb-2">
            {stat.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-base-content/60 flex-grow">
            {stat.description}
          </p>

          {/* Hover Effect Bar */}
          <motion.div
            className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4`}
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StatisticsCard;
