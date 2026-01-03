import React, { useEffect, useState } from "react";
import HeroBanner from "./HeroBannar";
import PartnerCard from "../../components/PartnerCard";
import HowItWorks from "./HowItWorks";
import Review from "./Review";
import { Link } from "react-router";
import { FaArrowAltCircleRight } from "react-icons/fa";
import Statistics from "./Statistics/Statistics";
import CardAnimations from "../../components/Animations/CardAnimations";

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
      <main className="md:max-w-7xl mx-auto space-y-10 my-15">
        {/* === Top Study partner ===  */}
        <section className="my-15">
          <h1 className="text-3xl text-primary font-bold my-6">
            Top Study Partners
          </h1>
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  space-x-4 items-center px-8 py-4">
            {topPartners.map((topPartner) => (
              <CardAnimations>
                {" "}
                <PartnerCard key={topPartner._id} Partner={topPartner} />
              </CardAnimations>
            ))}
          </div>
          <div className="w-full text-center mx-auto">
            <Link
              to={"/find-partners"}
              className="btn btn-outline border-2 border-primary text-lg "
            >
              Show All <FaArrowAltCircleRight />
            </Link>
          </div>
        </section>
        {/* === Statistics === */}
        <section className="my-15">
          <Statistics />
        </section>
        {/* === How it works === */}
        <section className="my-15">
          <h1 className="text-3xl text-primary p-2 font-bold my-6">
            How It Works
          </h1>
          <div className="mx-auto mb-10  px-4 my-6">
            <HowItWorks />
          </div>
        </section>
        {/* === review section === */}
        <section className="my-15">
          <h2 className="text-3xl font-bold my-6 text-primary">Testimonials</h2>
          <div className="mb-10 px-8 ">
            <Review />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
