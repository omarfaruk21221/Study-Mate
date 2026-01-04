import React, { useEffect, useState } from "react";
import FindPartnerCard from "./FindPartnerCard";
import { toast } from "react-toastify";
import NotFound from "../../../components/Share/ErrorPages/NotFound";
import axios from "axios"; // ✅ axios import করা হয়েছে

const FindParters = () => {
  const [partners, setParners] = useState([]);
  const [allPartners, setAllPartners] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    axios
      .get("https://study-mate-server-sigma.vercel.app/partners") // ✅ fetch এর পরিবর্তে axios.get()
      .then((res) => {
        setParners(res.data);
        setAllPartners(res.data);
      })
      .catch((err) => {
        console.error("Error fetching partners:", err);
        toast.error("Failed to load partners data!");
      });
  }, []);

  // === handleSearch ===
  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast.info("Please enter a name to search");
      return;
    }
    const searchPartner = allPartners.filter((partner) =>
      partner.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (searchPartner.length === 0) {
      toast.warning("No partner found with that name");
    }
    setParners(searchPartner);
  };

  // ===handle sort ====
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    let sorted = [...allPartners];
    if (sortValue == "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortValue == "experience") {
      sorted.sort((a, b) => a.experienceLevel.localeCompare(b.experienceLevel));
    } else {
      sorted = allPartners;
    }
    setParners(sorted);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-primary text-center font-bold mt-5">
          Find Your Partner
        </h1>
      </div>
      <div className="divider"></div>

      {/* ===== Header ===== */}
      <div className="flex max-w-7xl mx-auto flex-col md:flex-row justify-between items-center mb-10">
        <div className="w-full space-x-4 mb-3 md:mb-0">
          <label className="font-semibold text-accent">Sort by:</label>
          <select
            className="select select-bordered w-fit "
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="default">Default</option>
            <option value="name">Name</option>
            <option value="experience">Experience Level</option>
          </select>
        </div>

        {/* ==== search section ==== */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search by name..."
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="input input-bordered w-full md:w-64"
          />
          <button onClick={handleSearch} className="btn btn-primary text-white">
            Search
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto">
        {partners.length > 0 ? (
          <section className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-between gap-6 items-center">
            {partners.map((partner) => (
              <FindPartnerCard key={partner._id} Partner={partner} />
            ))}
          </section>
        ) : (
          <NotFound />
        )}
      </main>
    </div>
  );
};

export default FindParters;
