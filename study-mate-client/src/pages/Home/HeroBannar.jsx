// HeroBanner.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import logo from "../../assets/logo.png";
// ==== silde img import =
import slide1 from "../../assets/slide1.avif";
import slide2 from "../../assets/slide2.avif";
import slide3 from "../../assets/slide3.avif";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroBanner = () => {
  return (
    <div className="max-w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="heroSwiper"
      >
        <SwiperSlide>
          <div
            className="slide-content object-cover"
            style={{
              backgroundImage: `url(${slide1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#000",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div>
              <img className="w-60 h-50 object-cover" src={logo} alt="" />
              <p className="text-xl text-primary-content">
                Find Your Perfect Study Partner
              </p>
            </div>
          </div>
        </SwiperSlide>
        {/* == slide 2== */}
        <SwiperSlide>
          <div
            className="slide-content"
            style={{
              backgroundImage: `url(${slide2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div className=" flex flex-col items-center justify-center">
              <img className="w-60 h-50 object-cover" src={logo} alt="" />
              <h1 className="text-3xl font-bold text-primary-content ">
                Collaborate and Learn
              </h1>
              <p className="text-xl text-primary-content">
                Connect with study partners by subject or location
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="slide-content"
            style={{
              backgroundImage: `url(${slide3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              flexDirection: "column",
              textAlign: "center",
            }}
          >
            <div className=" flex flex-col items-center justify-center">
              <img className="w-60 h-50 object-cover" src={logo} alt="" />
              <h1 className="text-3xl font-bold text-primary-content ">
                Interactive Learning Platform
              </h1>
              <p className="text-xl text-primary-content">
                Make learning engaging and goal-oriented
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroBanner;
