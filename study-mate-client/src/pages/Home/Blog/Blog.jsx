// src/pages/Blog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BlogsData from "../../../../public/data/blogData.json";
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaFilter,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  console.log("Data", BlogsData);

   const { data , isLoading, isError, refetch } = useQuery({
        queryKey: ["bookings", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/blogs`);
            return res.data;
        },
    });
    console.log("blogs",data)
  // fetch from public/data/blogs.json
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(BlogsData, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setBlogs(data.blogs || []);
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((b) => b.category))],
    [blogs]
  );

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 pt-24 pb-16">
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
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
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
                        to={`/blog/${blog.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all"
                      >
                        Read article
                        <FaArrowRight className="text-[11px]" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;
