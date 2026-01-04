// src/pages/Blog.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaFilter, FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import BlogCard from "./BlogCard";
import Pagination from "../../../components/Pagination";

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const Blog = () => {
  const axiosSecure = useAxiosSecure();

  /* ================= STATE ================= */
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  /* ================= FETCH ================= */
  const {
    data: blogs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/blogs");
      return res.data;
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load blogs");
    },
  });

  /* ================= CATEGORIES ================= */
  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((b) => b.category))],
    [blogs]
  );

  /* ================= FILTER ================= */
  const filteredBlogs = useMemo(() => {
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

  /* ================= RESET PAGE ON FILTER ================= */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory]);

  /* ================= PAGINATION ================= */
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  /* ================= SCROLL TOP ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  /* ================= LOADING ================= */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-error">
        Failed to load blogs
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-base-100 to-base-200 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ================= HEADER ================= */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-widest text-primary mb-3">
              Blog
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-base-content mb-3">
              Latest Articles
            </h1>
            <p className="text-sm text-base-content/70 max-w-xl">
              Articles on React, Node, MongoDB & modern web development.
            </p>
          </div>

          {/* Search */}
          <div className="w-full md:max-w-sm">
            <label className="text-xs font-semibold text-base-content/60 mb-1 block">
              Search blogs
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-3.5 text-base-content/50 text-sm" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, tag or keyword"
                className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-base-300 bg-base-100 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </header>

        {/* ================= FILTER ================= */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase text-base-content/50">
              <FaFilter />
              Category
            </span>

            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                  selectedCategory === cat
                    ? "bg-base-content text-base-100 border-base-content"
                    : "bg-base-100 text-base-content/70 border-base-300 hover:bg-base-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs text-base-content/60">
            Showing{" "}
            <span className="font-semibold text-base-content">
              {filteredBlogs.length}
            </span>{" "}
            blogs
          </p>
        </div>

        {/* ================= BLOG GRID ================= */}
        {paginatedBlogs.length === 0 ? (
          <div className="pt-16 text-center text-base-content/60 text-sm">
            No blogs found. Try different search or category.
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage} // 🔥 animation trigger
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {paginatedBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* ================= PAGINATION ================= */}
            <Pagination
              totalItems={filteredBlogs.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;
