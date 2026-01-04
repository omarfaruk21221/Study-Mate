import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FindPartnerCard from "./FindPartnerCard";
import Pagination from "../../../components/Share/Pagination";
import { toast } from "react-toastify";
import NotFound from "../../../components/Share/ErrorPages/NotFound";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const FindParters = () => {
  const axiosSecure = useAxiosSecure();

  const [partners, setPartners] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // ===== Fetch partners =====
  useEffect(() => {
    axiosSecure
      .get("/partners")
      .then((res) => {
        setPartners(res.data);
        setAllPartners(res.data);
      })
      .catch(() => {
        toast.error("Failed to load partners data!");
      });
  }, [axiosSecure]);

  // ===== Search =====
  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.info("Please enter a name to search");
      return;
    }

    const result = allPartners.filter((partner) =>
      partner.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    if (result.length === 0) {
      toast.warning("No partner found with that name");
    }

    setPartners(result);
    setCurrentPage(1);
  };

  // ===== Sort =====
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);

    let sorted = [...partners];

    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "experience") {
      sorted.sort((a, b) => a.experienceLevel.localeCompare(b.experienceLevel));
    } else {
      sorted = [...allPartners];
    }

    setPartners(sorted);
    setCurrentPage(1);
  };

  // ===== Pagination logic =====
  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return partners.slice(start, start + itemsPerPage);
  }, [partners, currentPage, itemsPerPage]);

  // ===== Scroll to top on page change =====
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="pb-16">
      {/* ===== Title ===== */}
      <h1 className="text-3xl text-primary text-center font-bold mt-6">
        Find Your Partner
      </h1>
      <div className="divider"></div>

      {/* ===== Header ===== */}
      <div className="flex max-w-7xl mx-auto flex-col md:flex-row justify-between items-center mb-10 px-4">
        {/* Sort */}
        <div className="w-full space-x-4 mb-3 md:mb-0">
          <label className="font-semibold text-accent">Sort by:</label>
          <select
            className="select select-bordered w-fit"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="experience">Experience Level</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="input input-bordered w-full md:w-64"
          />
          <button onClick={handleSearch} className="btn btn-primary text-white">
            Search
          </button>
        </div>
      </div>

      {/* ===== Cards Grid ===== */}
      <main className="max-w-7xl mx-auto px-4">
        {partners.length > 0 ? (
          <>
            <AnimatePresence mode="wait">
              <motion.section
                key={currentPage} // 🔥 smooth page animation trigger
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {paginatedPartners.map((partner) => (
                  <motion.div
                    key={partner._id}
                    layout
                    transition={{ duration: 0.25 }}
                  >
                    <FindPartnerCard Partner={partner} />
                  </motion.div>
                ))}
              </motion.section>
            </AnimatePresence>

            {/* ===== Pagination (YOUR COMPONENT) ===== */}
            <div className="mt-12">
              <Pagination
                totalItems={partners.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  );
};

export default FindParters;
