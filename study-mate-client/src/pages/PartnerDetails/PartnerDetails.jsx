import React, { useEffect, useState, useContext } from "react";
import {
  FaRegStar,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
} from "react-icons/fa";
import { useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../components/Spiners/Loader";
import NotFound from "../../components/Share/ErrorPages/NotFound";

const PartnerDetails = () => {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const id = params.id;
  const axiosSecure = useAxiosSecure();
  const [btnDisable, setBtnDisable] = useState(false);
  // Fetch partner data
  const {
    data: partner = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["partner", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/partner/${id}`);
      return res.data;
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || "Failed to load partner data"
      );
    },
  });

  const [partnersCount, setPartnersCount] = useState(partner.patnerCount || 0);

  //  Check if request already sent (useAxiosSecure)
  useEffect(() => {
    if (!user) return;

    const checkRequest = async () => {
      try {
        const res = await axiosSecure.get(
          `/connections/check-request?userEmail=${user.email}&partnerId=${id}`
        );
        if (res.data.exists) setBtnDisable(true);
      } catch (error) {
        toast.error("Failed to check request status", error);
      }
    };

    checkRequest();
  }, [user, id, axiosSecure]);

  // Send partner request
  const handleSendRequest = async () => {
    if (!user) return toast.error("You must be logged in to send a request");
    setBtnDisable(true);

    const requestData = {
      partnerId: partner._id,
      partnerName: partner.name,
      partnerImg: partner.profileimage,
      partnerSubject: partner.subject,
      partnerStudyMode: partner.studyMode,
      partnerEmail: partner.email,
      userName: user.displayName,
      userEmail: user.email,
      partnerRequest: "pending",
      date: new Date().toISOString(),
    };

    const newCount = (partner.patnerCount || 0) + 1;
    setPartnersCount(newCount);

    try {
      // Update partner count
      await axiosSecure.patch(`/partners/${id}`, { patnerCount: newCount });

      // Send partner request
      await axiosSecure.post(`/connections/sent-request`, requestData);

      toast.success("Partner request sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send partner request");
      setPartnersCount(partner.patnerCount || 0);
      setBtnDisable(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return <NotFound />;
  }

  const {
    _id,
    name,
    email,
    rating,
    subject,
    availability,
    studyMode,
    location,
    experienceLevel,
    profileimage,
    description,
  } = partner;

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 my-12 transition-all">
      {/* ====?cover === */}

      {/* Header */}
      <div className="w-full md:flex items-center gap-6">
        <div className="relative">
          <img
            src={profileimage || "/default-avatar.png"}
            alt={name}
            className="w-48 h-48 md:w-52 md:h-52 rounded-full object-cover border-4 border-primary shadow-lg"
          />
          <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900 animate-pulse"></span>
        </div>
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-3xl md:text-4xl font-extrabold text-primary">
            {name}
          </h1>
          <div className="flex items-center space-x-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < rating ? <FaStar /> : <FaRegStar />}</span>
            ))}
            <span className="text-accent ml-2">({rating || 0} / 5)</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 font-medium">
            {subject}
          </p>
        </div>
      </div>

      <span className="divider my-6"></span>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-200">
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
          <p>
            <FaUser className="inline mr-2 text-primary" />
            <strong>Study Mode:</strong> {studyMode}
          </p>
          <p>
            <FaClock className="inline mr-2 text-primary" />
            <strong>Availability:</strong> {availability}
          </p>
          <p>
            <FaStar className="inline mr-2 text-primary" />
            <strong>Experience Level:</strong> {experienceLevel}
          </p>
        </div>
        <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
          <p>
            <FaMapMarkerAlt className="inline mr-2 text-primary" />
            <strong>Location:</strong> {location}
          </p>
          <p>
            <FaUser className="inline mr-2 text-primary" />
            <strong>Partner Count:</strong> {partnersCount}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
        </div>
      </div>

      <span className="divider my-6"></span>
      <div className=" bg-base-100/70 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
        <h1 className="py-4">
          {" "}
          <strong>Description</strong>
        </h1>
        {description}
      </div>

      {/* Action Button */}
      <div className="flex justify-center my-5">
        <button
          onClick={handleSendRequest}
          disabled={btnDisable}
          className={`btn btn-primary w-full md:w-64 transition-all ${
            btnDisable ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {btnDisable ? "Request Sent" : "Send Partner Request"}
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
