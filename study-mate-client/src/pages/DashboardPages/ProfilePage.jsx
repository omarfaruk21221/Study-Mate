import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaEdit,
  FaCamera,
  FaCalendarAlt,
  FaShieldAlt,
} from "react-icons/fa";
import userPlaceholder from "../../assets/user_placeholder.png";
import cubesPattern from "../../assets/cubes_pattern.png";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  /* ================= ROLE STYLE ================= */
  const roleConfig = {
    admin: {
      color: "bg-primary text-primary-content shadow-primary/40",
      icon: <FaShieldAlt className="mr-2" />,
    },
    decorator: {
      color: "bg-secondary text-secondary-content shadow-secondary/40",
      icon: <FaIdBadge className="mr-2" />,
    },
    user: {
      color: "bg-green-400 text-green-900 shadow-lg shadow-green-200",
      icon: <FaUser className="mr-2" />,
    },
  };
  const roleStyle = roleConfig[profile?.role] || roleConfig.user;

  return (
    <div className="min-h-screen bg-base-200 pb-12 transition-colors font-sans">
      {/* ================= COVER ================= */}
      <div className="relative h-72 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary">
          <h1 className="text-3xl md:text-5xl text-center pt-10 font-extrabold text-primary-content/80">
            My Profile
          </h1>
        </div>

        <div
          className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url(${cubesPattern})` }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-24 -right-24 w-96 h-96 bg-base-100 rounded-full blur-3xl"
        />
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="container mx-auto px-4 relative -mt-32 z-10 max-w-5xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden"
        >
          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between p-8 gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-1.5 bg-base-100 ring-4 ring-primary/30 shadow-xl">
                <img
                  src={profile?.image || user?.photoURL || userPlaceholder}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                <span className="absolute bottom-4 right-4 w-5 h-5 bg-success border-4 border-base-100 rounded-full" />
              </div>

              <div className="absolute inset-0 rounded-full flex items-center justify-center bg-primary/40 opacity-0 group-hover:opacity-100 transition cursor-pointer">
                <FaCamera className="text-primary-content text-3xl" />
              </div>
            </div>

            {/* Name & Role */}
            <div className="flex-1 text-center md:text-left w-full">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-base-content">
                    {profile?.name || user?.displayName}
                  </h2>
                  <p className="flex items-center gap-2 justify-center md:justify-start mt-2 text-base-content/70">
                    <FaEnvelope />
                    {profile?.email || user?.email}
                  </p>
                </div>

                <div
                  className={`px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg flex items-center ${roleStyle.color}`}
                >
                  {roleStyle.icon}
                  {profile?.role || "USER"}
                </div>
              </div>
            </div>
          </div>

          {/* ================= TABS ================= */}
          <div className="px-8 border-b border-base-300 flex gap-8">
            <button className="pb-4 border-b-2 border-primary text-primary font-semibold">
              Overview
            </button>
            <button className="pb-4 text-base-content/60 hover:text-base-content">
              Settings
            </button>
            <button className="pb-4 text-base-content/60 hover:text-base-content">
              Security
            </button>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="p-8 bg-base-200 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Info */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm"
            >
              <div className="flex justify-between mb-6">
                <h3 className="text-xl font-bold text-base-content">
                  Personal Information
                </h3>
                <button className="btn btn-circle btn-ghost btn-sm text-primary">
                  <FaEdit />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase text-base-content/60">
                    Full Name
                  </span>
                  <div className="text-lg font-medium">
                    {profile?.name || "Not Set"}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase text-base-content/60">
                    Email
                  </span>
                  <div className="text-lg font-medium">
                    {profile?.email || user?.email}
                  </div>
                </div>

                <div>
                  <span className="text-xs uppercase text-base-content/60">
                    User ID
                  </span>
                  <div className="font-mono text-sm bg-base-200 p-2 rounded border border-base-300 break-all">
                    {profile?._id || user?.uid}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Account Status */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-sm"
            >
              <h3 className="text-xl font-bold text-base-content mb-6">
                Account Status
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-primary">Active</div>
                  <div className="text-xs uppercase text-base-content/60">
                    Status
                  </div>
                </div>

                <div className="bg-secondary/10 p-4 rounded-xl text-center">
                  <div className="text-3xl font-bold text-secondary">
                    {profile?.role === "admin"
                      ? "Lvl 99"
                      : profile?.role === "seller"
                      ? "Lvl 10"
                      : "Lvl 1"}
                  </div>
                  <div className="text-xs uppercase text-base-content/60">
                    Access
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex gap-3 items-center text-sm bg-base-200 p-3 rounded-xl">
                  <FaCalendarAlt />
                  <span className="text-base-content/70">Member Since:</span>
                  <span className="font-semibold">
                    {new Date(
                      user?.metadata?.creationTime
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex gap-3 items-center text-sm bg-base-200 p-3 rounded-xl">
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="text-base-content/70">Last Login:</span>
                  <span className="font-semibold">
                    {new Date(user?.metadata?.lastSignInTime).toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
