// src/pages/BlogDetail.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaSpinner,
} from "react-icons/fa";

const BlogDetail = () => {
  const { id } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // load all blogs once
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch("/data/blogs.json");
        const data = await res.json();
        setBlogs(data.blogs || []);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const blog = useMemo(
    () => blogs.find((b) => String(b.id) === String(id)),
    [blogs, id]
  );

  const related = useMemo(
    () =>
      blogs
        .filter(
          (b) => b.category === blog?.category && String(b.id) !== String(id)
        )
        .slice(0, 3),
    [blogs, blog, id]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-base-100 to-base-200 px-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-error/80 mb-2">
          404 — Article not found
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4 text-center">
          The article you are looking for is unavailable.
        </h1>
        <Link to="/blog" className="btn btn-primary btn-sm mt-2">
          Back to all articles
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Back */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-base-content/70 hover:text-primary transition-colors"
          >
            <FaArrowLeft className="text-[11px]" />
            Back to all articles
          </Link>
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-base-content/50">
            {blog.category}
          </span>
        </div>

        {/* Title + meta */}
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-base-content mb-4">
            {blog.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-xs text-base-content/70 border-y border-base-300 py-3">
            <span className="inline-flex items-center gap-2">
              <FaUser className="text-primary text-sm" />
              <span className="font-medium">{blog.author}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <FaCalendarAlt className="text-primary text-sm" />
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-2">
              <FaClock className="text-accent text-sm" />
              {blog.readTime}
            </span>
          </div>
        </motion.header>

        {/* Image */}
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8 rounded-2xl overflow-hidden border border-base-300 bg-base-200"
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-72 md:h-80 object-cover"
          />
        </motion.figure>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mb-10"
        >
          <div className="prose prose-sm md:prose-base max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content">
            <p className="leading-relaxed whitespace-pre-line">
              {blog.content}
            </p>
          </div>
        </motion.article>

        {/* Tags */}
        <div className="mb-10 border-t border-base-300 pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/50 mb-3">
            Tags
          </p>
          <div className="flex flex-wrap gap-2">
            {blog.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-base-300 pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-base-content uppercase tracking-[0.16em]">
                More in {blog.category}
              </h2>
              <Link
                to="/blog"
                className="text-[11px] text-primary font-semibold"
              >
                View all
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.id}`}
                  className="group rounded-xl border border-base-300 bg-base-100 hover:bg-base-50 hover:border-primary/40 transition-all shadow-sm hover:shadow-md overflow-hidden"
                >
                  <div className="h-24 overflow-hidden bg-base-200">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[11px] text-base-content/50 mb-1">
                      {item.readTime}
                    </p>
                    <h3 className="text-sm font-semibold text-base-content line-clamp-2 group-hover:text-primary">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </section>
  );
};

export default BlogDetail;
