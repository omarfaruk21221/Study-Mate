// src/pages/Blog.jsx
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaFilter,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import BlogCard from "./BlogCard";

const Blog = () => {
  const axiosSecure = useAxiosSecure();

  // State for search & category
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch blogs using React Query v5
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data; // Make sure API returns an array
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load blogs");
    },
  });

  // Categories for filter
  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((b) => b.category))],
    [blogs]
  );

  // Filter blogs by search & category
  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return blogs.filter((blog) => {
      const byCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const bySearch =
        blog.title.toLowerCase().includes(term) ||
        blog.excerpt.toLowerCase().includes(term) ||
        blog.tags?.some((t) => t.toLowerCase().includes(term));
      return byCategory && bySearch;
    });
  }, [blogs, search, selectedCategory]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load blogs
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-base-100 to-base-200 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Omar’s Engineering Journal
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-base-content mb-3">
              Articles on{" "}
              <span className="bg-linear-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                React, Node & Modern Web
              </span>
            </h1>
            <p className="text-sm md:text-base text-base-content/70 max-w-xl">
              Deep dives, practical guides and field-notes from building
              full‑stack apps with React, Next.js, Express and MongoDB.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:max-w-sm">
            <label className="text-xs font-semibold text-base-content/60 mb-1 block">
              Search across all articles
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-base-content/50 text-sm" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, topic or tag"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-base-300 bg-base-100 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>
        </header>

        {/* Filter row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-base-content/50">
              <FaFilter className="text-xs" />
              Filter by stack
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    selectedCategory === cat
                      ? "bg-base-content text-base-100 border-base-content shadow-sm"
                      : "bg-base-100 text-base-content/70 border-base-300 hover:bg-base-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-base-content/60">
            Showing{" "}
            <span className="font-semibold text-base-content">
              {filtered.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-base-content">
              {blogs.length}
            </span>{" "}
            articles
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="pt-16 text-center text-base-content/60 text-sm">
            No articles match your filters. Try a different keyword or category.
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AnimatePresence>
              {filtered.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
