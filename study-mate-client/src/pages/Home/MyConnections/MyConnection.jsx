import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ConnUpdateModal from "./ConnUpdateModal";

const MyConnection = () => {
  const { user } = use(AuthContext);
  const [connections, setConnections] = useState([]);
  const [editingData, setEditingData] = useState({});
  // console.log(user)
  // Load all connections by user email
  const fetchConnections = () => {
    if (user?.email) {
      fetch(
        `https://study-mate-server-sigma.vercel.app/my-connections?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => setConnections(data))
        .catch(() => toast.error("Failed to load connections"));
    }
  };
  useEffect(() => {
    fetchConnections();
  }, [user?.email]);

  console.log(connections);
  // Handle delete connection
  const handleDeletePartner = async (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://study-mate-server-sigma.vercel.app/connections/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Partner has been deleted.",
                icon: "success",
              });
              //   Optionally update UI:
              setConnections((prev) => prev.filter((conn) => conn._id !== _id));
            } else {
              toast.error("Delete failed — no matching bid found!");
            }
          });
        // console.log("Delete Bids");
      }
    });
  };
  //   console.log(editingId);
  //  Handle update connectors
  const handleUpdateConn = (connection) => {
    setEditingData({
      id: connection._id,
      subject: connection.partnerSubject,
      studyMode: connection.partnerStudyMode,
    });
    // console.log(id, subject, studyMode);
    document.getElementById("my_modal_5").showModal();
  };
  // console.log(editingIData);
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl text-base-200 bg-primary w-fit mx-auto p-4 font-bold text-center rounded-b-2xl shadow-xl">
        My Connections
      </h1>
      <span className="divider"></span>
      {connections.length === 0 ? (
        <p className="text-center text-accent">No connections found.</p>
      ) : (
        <div className="overflow-x-auto my-10">
          <table className="table w-full ">
            <thead className="bg-primary text-white">
              <tr className="text-center">
                <th>Profile</th>
                <th>Partner Name</th>
                <th>Subject</th>
                <th>Study Mode</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((conn) => (
                <tr
                  key={conn._id}
                  className="hover:bg-secondary hover:text-black text-xl shadow rounded-2xl m-2 text-center  "
                >
                  <td>
                    <img
                      src={conn.partnerImg}
                      alt={conn.partnerName}
                      className="w-12 h-12 rounded-full object-cover border-2     border-primary mx-auto"
                    />
                  </td>
                  <td className="font-semibold">{conn.partnerName}</td>
                  <td className="font-semibold">{conn.partnerSubject}</td>
                  <td className="font-semibold">{conn.partnerStudyMode}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => handleUpdateConn(conn)}
                    >
                      Update
                    </button>
                    {/* ==delete btn === */}
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
          {/* =============================== */}
          {/* === update modal === */}
          <ConnUpdateModal
            editingData={editingData}
            onUpdated={fetchConnections}
          />
        </div>
      )}
    </div>
  );
};

export default MyConnection;
