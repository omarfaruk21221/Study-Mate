import { motion } from "framer-motion";
import React from "react";
import { FaCalendarAlt, FaClock, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

export default function BlogCard({ blog }) {
  return (
    <>
      <motion.article
        key={blog.id}
        layout
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 22 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="group rounded-2xl border border-base-300 bg-base-100/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
      >
        <figure className="relative h-44 overflow-hidden bg-base-200">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.14em] bg-base-100/90 text-base-content border border-base-200">
            {blog.category}
          </span>
        </figure>

        <div className="flex-1 flex flex-col px-4 pt-4 pb-4">
          <h2 className="text-base md:text-lg font-semibold text-base-content line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h2>
          <p className="text-xs md:text-sm text-base-content/70 line-clamp-2 mb-3">
            {blog.excerpt}
          </p>

          <div className="flex items-center justify-between gap-3 text-[11px] text-base-content/60 mb-3">
            <span className="inline-flex items-center gap-1">
              <FaCalendarAlt className="text-primary text-xs" />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1">
              <FaClock className="text-accent text-xs" />
              {blog.readTime}
            </span>
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-wrap gap-1">
              {blog.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <Link
              to={`/blog/${blog._id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all"
            >
              Read article
              <FaArrowRight className="text-[11px]" />
            </Link>
          </div>
        </div>
      </motion.article>
    </>
  );
}
