import React from "react";
import { motion } from "framer-motion";

export default function EaseInAnimation({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.5 }}
      className=" mb-10 bg-base-100 rounded-lg shadow-md p-6 flex flex-col items-center hover:bg-accent cursor-pointer"
    >
      {children}
    </motion.div>
  );
}
