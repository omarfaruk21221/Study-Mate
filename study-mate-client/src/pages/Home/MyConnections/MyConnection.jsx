import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import ConnUpdateModal from "./ConnUpdateModal";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyConnection = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [connections, setConnections] = useState([]);
  const [editingData, setEditingData] = useState({});

  // === Load connections using useAxiosSecure ===
  const fetchConnections = async () => {
    if (!user?.email) return;
    try {
      const res = await axiosSecure.get(`/my-connections?email=${user.email}`);
      setConnections(res.data);
    } catch (error) {
      toast.error("Failed to load connections", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, [user?.email]);

  // === Delete connection ===
  const handleDeletePartner = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/connections/${_id}`);
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your Partner has been deleted.", "success");
            setConnections((prev) => prev.filter((c) => c._id !== _id));
          } else {
            toast.error("Delete failed — no matching record found!");
          }
        } catch (err) {
          toast.error("Failed to delete connection", err);
        }
      }
    });
  };

  // === Open update modal ===
  const handleUpdateConn = (connection) => {
    setEditingData({
      id: connection._id,
      subject: connection.partnerSubject,
      studyMode: connection.partnerStudyMode,
    });
    document.getElementById("my_modal_5")?.showModal();
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-base-100 bg-primary w-fit mx-auto p-4 rounded-b-2xl shadow-lg">
        My Connections
      </h1>
      <span className="divider"></span>

      {connections.length === 0 ? (
        <p className="text-center text-accent text-lg mt-10">
          No connections found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center">Partner Image</th>
                <th className="text-center">Partner Name</th>
                <th className="text-center">Partner Subject</th>
                <th className="text-center">Partner Status</th>
                <th className="text-center">Request Status</th>
                <th className="text-center"> Request Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {connections.map((conn) => (
                <tr
                  key={conn._id}
                  className="hover:bg-base-300 hover:text-black transition-all shadow-sm rounded-xl"
                >
                  <td>
                    <img
                      src={conn.partnerImg}
                      alt={conn.partnerName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary mx-auto"
                    />
                  </td>
                  <td className="font-semibold text-base-content">
                    {conn.partnerName}
                  </td>
                  <td className="font-medium text-accent">
                    {conn.partnerSubject}
                  </td>
                  <td className="font-medium text-secondary">
                    {conn.partnerStudyMode}
                  </td>
                  <td className="font-medium text-secondary">
                    {conn.partnerRequest}
                  </td>
                  <td className="flex items-center justify-center gap-4 ">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateConn(conn)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeletePartner(conn._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyConnection;
