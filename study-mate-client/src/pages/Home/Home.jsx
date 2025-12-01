import React, { useEffect, useState } from "react";
import HeroBanner from "./HeroBannar";
import PartnerCard from "../../components/PartnerCard";
import HowItWorks from "./HowItWorks";
import Review from "./Review";
import { Link } from "react-router";
import { FaArrowAltCircleRight } from "react-icons/fa";

const Home = () => {
  const [topPartners, setTopPartners] = useState([]);
  console.log(topPartners);

  // === load top Partner Data ===
  useEffect(() => {
    fetch("https://study-mate-server-sigma.vercel.app/topPartners")
      .then((res) => res.json())
      .then((data) => {
        setTopPartners(data);
        // console.log("Top Partner form data ", data);
      });
  }, []);
  return (
    <div>
      <header>
        <HeroBanner />
      </header>
      <main>
        {/* === study partner ===  */}
        <section>
          <h1 className="text-3xl text-primary font-bold text-center my-10">
            Top Study Partners
          </h1>
          <div className="w-full md:w-9/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4space-x-4 items-center">
            {topPartners.map((topPartner) => (
              <PartnerCard key={topPartner._id} Partner={topPartner} />
            ))}
          </div>
          <div className=" w-full  text-center mx-auto ">
            <Link
              to={"/find-partners"}
              className="  btn btn-outline border-2 border-primary text-lg "
            >
              Show All <FaArrowAltCircleRight />
            </Link>
          </div>
        </section>
        {/* === How it works === */}
        <section className=" mx-auto bg-base-content rounded-3xl">
          <h1 className="text-3xl w-fit text-primary bg-base-100 mx-auto p-2  rounded-b-2xl font-bold text-center my-10 shadow">
            How It Works
          </h1>
          <div className="w-9/12 mx-auto mb-10 pb-10  ">
            <HowItWorks />
          </div>
        </section>
        {/* === review section === */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Testimonials
          </h2>
          <div className="max-w-6xl mx-auto mb-10">
            <Review />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
