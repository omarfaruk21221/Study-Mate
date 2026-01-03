import React from "react";
import { motion } from "framer-motion";
import StatisticsCard from "./StatisticsCard";

const Statistics = () => {
  const stats = [
    {
      icon: "👥",
      value: "2,500+",
      title: "Active Students",
      description: "Learners joining every day",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🎓",
      value: "150+",
      title: "Expert Teachers",
      description: "Qualified professionals",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: "📚",
      value: "500+",
      title: "Courses Available",
      description: "Diverse learning paths",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "⭐",
      value: "4.9/5",
      title: "Average Rating",
      description: "From 10,000+ reviews",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-base-200 via-base-300 to-base-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Our Impact by Numbers
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Join thousands of students and professionals who are transforming
            their careers with our platform
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <StatisticsCard key={index} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-12 md:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <button className="btn btn-primary btn-lg md:btn-md">
            Start Your Learning Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
