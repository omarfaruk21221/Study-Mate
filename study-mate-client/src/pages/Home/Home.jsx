import React, { useState } from "react";
import HeroBanner from "./HeroBannar";
import PartnerCard from "../../components/PartnerCard"; // <-- Component to render blogs
import HowItWorks from "./HowItWorks";
import Review from "./Review";
import { Link } from "react-router-dom";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleRight,
  FaSpinner,
} from "react-icons/fa";
import Statistics from "./Statistics/Statistics";
import FAQSection from "./FAQSection";
import Brands from "./Brands";
import Contact from "./Contact";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import BlogCard from "./Blog/BlogCard";
import FindPartnerCard from "./FindPartners/FindPartnerCard";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [limit, setLimit] = useState(4);

  const {
    data = { partners: [], blogs: [] },
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["homeData", limit],
    queryFn: async () => {
      const [partnersRes, blogsRes] = await Promise.all([
        axiosSecure.get(`/partners?limit=${limit}`),
        axiosSecure.get(`/blogs?limit=${limit}`),
      ]);
      return {
        partners: partnersRes.data,
        blogs: blogsRes.data,
      };
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load data");
    },
  });

  const topPartners = data.partners;
  const topBlogs = data.blogs;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="text-4xl text-primary animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load data
      </div>
    );
  }

  return (
    <div>
      <header>
        <HeroBanner />
      </header>
      <main className="md:max-w-7xl mx-auto space-y-10 my-15">
        {/* Top Study Partners */}
        <section className="my-15">
          <h1 className="text-3xl text-primary font-bold my-6">
            Top Study Partners
          </h1>
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between items-center px-8 py-4">
            {topPartners.map((partner) => (
              <FindPartnerCard key={partner._id} Partner={partner} />
            ))}
          </div>
          <div className="w-full text-center mx-auto mt-4">
            <Link
              to={"/find-partners"}
              className="btn btn-outline border-2 border-primary text-lg"
            >
              Show All <FaArrowAltCircleRight />
            </Link>
            {topPartners.length >= limit && (
              <button
                onClick={() => setLimit(limit + 4)}
                className="ml-4 btn btn-primary text-lg"
              >
                Load More <FaArrowAltCircleDown />
              </button>
            )}
          </div>
        </section>

        {/* Statistics */}
        <section className="my-15">
          <Statistics />
        </section>

        {/* Sponsor Brands */}
        <section className="my-15">
          <h1 className="text-3xl text-primary font-bold my-10">
            Our Sponsor Brands
          </h1>
          <div className="mx-auto mb-10 px-4 my-6">
            <Brands />
          </div>
        </section>

        {/* Top Blogs */}
        <section className="my-15">
          <h1 className="text-3xl text-primary font-bold my-6">Recent Blogs</h1>
          <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-between items-center px-8 py-4">
            {topBlogs.map((blog) => (
              <BlogCard className="" key={blog._id} blog={blog} />
            ))}
          </div>
          <div className="w-full text-center mx-auto mt-4">
            <Link
              to={"/blogs"}
              className="btn btn-outline border-2 border-primary text-lg"
            >
              Show All <FaArrowAltCircleRight />
            </Link>
            {topBlogs.length >= limit && (
              <button
                onClick={() => setLimit(limit + 4)}
                className="ml-4 btn btn-primary text-lg"
              >
                Load More <FaArrowAltCircleDown />
              </button>
            )}
          </div>
        </section>

        {/* How It Works */}
        <section className="my-15">
          <h1 className="text-3xl text-primary p-2 font-bold my-6">
            How It Works
          </h1>
          <div className="mx-auto mb-10 px-4 my-6">
            <HowItWorks />
          </div>
        </section>

        {/* Testimonials */}
        <section className="my-15">
          <h2 className="text-3xl font-bold my-6 text-primary">Testimonials</h2>
          <div className="mb-10 px-8">
            <Review />
          </div>
        </section>

        {/* FAQ */}
        <section className="my-15">
          <FAQSection />
        </section>

        {/* Contact */}
        <section className="my-15">
          <Contact />
        </section>
      </main>
    </div>
  );
};

export default Home;
