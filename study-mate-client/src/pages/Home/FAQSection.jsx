import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      id: 3,
      question: "Will I receive a certificate?",
      answer:
        "Yes! Upon completing any course, you'll receive a verifiable certificate of completion. You can download it in PDF format and share it on your LinkedIn profile or resume to showcase your skills.",
      category: "Certification",
      icon: "🏆",
    },

    {
      id: 5,
      question: "Is there a refund policy?",
      answer:
        "Absolutely! We offer a 30-day money-back guarantee with no questions asked. If you're not satisfied with your purchase for any reason, contact our support team for a full refund.",
      category: "Payment",
      icon: "💰",
    },
    {
      id: 6,
      question: "Can I learn on mobile devices?",
      answer:
        "Yes! Our platform is fully responsive and mobile-friendly. You can access all courses, lectures, and learning materials from your smartphone or tablet. Our mobile experience is optimized for learning on the go.",
      category: "Technology",
      icon: "📱",
    },
    {
      id: 7,
      question: "Can I interact with other students?",
      answer:
        "Definitely! Join our vibrant community forum where you can connect with fellow learners, ask questions, share insights, and collaborate on projects. It's a great way to network and learn from peers.",
      category: "Community",
      icon: "👥",
    },
    {
      id: 8,
      question: "Can I get direct help from instructors?",
      answer:
        "Of course! Each course has a dedicated Q&A section where you can ask instructors questions directly. They typically respond within 24-48 hours. Premium members also get access to live office hours.",
      category: "Support",
      icon: "🤝",
    },
    {
      id: 9,
      question: "What if I miss a deadline?",
      answer:
        "There are no strict deadlines for course completion! You can learn at your own pace without any time pressure. However, if your course has optional assignments with feedback, we recommend completing them within 2 weeks for better support.",
      category: "Course Access",
      icon: "📅",
    },
    {
      id: 10,
      question: "Do you offer discounts or scholarships?",
      answer:
        "Yes! We regularly offer seasonal discounts, bundle deals, and promotional offers. For eligible students, we also have scholarship programs. Check our promotions page or subscribe to our newsletter for the latest offers.",
      category: "Payment",
      icon: "🎁",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const iconVariants = {
    hidden: { rotate: 0 },
    visible: { rotate: 180 },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-base-200 via-base-300/50 to-base-200">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about our courses, account, and
            learning experience
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                layout
                className="bg-base-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-base-300 overflow-hidden"
              >
                {/* Question Header */}
                <motion.button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className={`w-full px-6 md:px-8 py-4 md:py-5 flex items-center justify-between text-left font-semibold text-base md:text-lg transition-colors ${
                    activeIndex === index
                      ? "bg-primary/5 text-primary border-b border-primary/20"
                      : "text-base-content hover:bg-base-200"
                  }`}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                >
                  <span className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <span className="text-2xl md:text-3xl flex-shrink-0">
                      {item.icon}
                    </span>
                    <span className="break-words">{item.question}</span>
                  </span>

                  <motion.div
                    variants={iconVariants}
                    animate={activeIndex === index ? "visible" : "hidden"}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      className="w-5 h-5 md:w-6 md:h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </motion.div>
                </motion.button>

                {/* Answer Content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="px-6 md:px-8 py-4 md:py-5 text-base-content/80 text-sm md:text-base leading-relaxed border-t border-base-300"
                    >
                      <motion.div
                        className="h-1 bg-linear-to-r from-primary to-accent rounded-full mb-4"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.4 }}
                        style={{ transformOrigin: "left" }}
                      />
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
