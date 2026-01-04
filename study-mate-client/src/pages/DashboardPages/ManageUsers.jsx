// UsersTable.jsx
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../components/Spiners/Loader";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // === Load users from API ===
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // === Update role ===
  const handleRoleChange = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role: newRole });
      toast.success("Role updated!");
      fetchUsers(); // refresh users
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // === Delete user ===
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axiosSecure.delete(`/users/${id}`);
      toast.success("User deleted!");
      fetchUsers(); // refresh users
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto mt-8">
      <div className="px-10">
        <h1 className="text-2xl md:text-4xl font-bold text-primary ">
          Users Management
        </h1>
        <p className="text-xs md:text-md bg-base-200/20 mb-4">
          All Users :{users.length}
        </p>
      </div>
      <span className="divider"></span>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table max-w-7xl mx-auto border overflow-hidden">
            <thead className="bg-primary text-white ">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className=" border-b hover:bg-base-300 ">
                  <td>{idx + 1}</td>
                  <td>
                    <img
                      className="w-10 h-10 rounded-xl border border-primary shadow-md shadow-primary/20"
                      src={user.image}
                      alt="user Image"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded-full text-white ${
                        user.role === "admin" ? "bg-rose-500" : "bg-blue-500"
                      }`}
                    >
                      {user.role.toUpperCase()}
                    </span>
                  </td>

                  <td className="flex justify-center gap-2">
                    {user.role !== "admin" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleRoleChange(user._id, "admin")}
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role === "admin" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleRoleChange(user._id, "user")}
                      >
                        Make User
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(user._id)}
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

export default ManageUsers;
