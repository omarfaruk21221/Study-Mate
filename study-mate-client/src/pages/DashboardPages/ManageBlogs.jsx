import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../components/Spiners/Loader";
import { FaEye, FaCheck, FaTrash } from "react-icons/fa";

const ManageBlogs = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // -------- Load Blogs --------
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/blogs");
      // Only show pending blogs
      const pendingBlogs = res.data.filter((blog) => blog.status !== "publish");
      setBlogs(pendingBlogs);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // -------- Approve Blog --------
  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/approve`);
      toast.success("Blog approved and published!");

      // Remove the approved blog from the list instantly
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));

      // ✅ DO NOT call fetchBlogs() here to avoid flicker/reload
    } catch (error) {
      toast.error("Failed to approve blog");
    }
  };

  // -------- Delete Blog --------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axiosSecure.delete(`/blogs/${id}`);
      toast.success("Blog deleted!");
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto mt-8">
      <div className="px-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Manage Blogs
        </h1>
        <p className="text-sm md:text-md bg-base-200/20 mb-4">
          Pending Blogs: {blogs.length}
        </p>
      </div>
      <span className="divider"></span>

      {blogs.length === 0 ? (
        <p className="text-center text-accent">No pending blogs found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table max-w-7xl mx-auto border overflow-hidden">
            <thead className="bg-primary text-white">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, idx) => (
                <tr key={blog._id} className="border-b hover:bg-base-200">
                  <td>{idx + 1}</td>
                  <td className="font-semibold">{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>
                  <td className="flex justify-center gap-2">
                    <button
                      className="btn btn-info btn-sm flex items-center gap-1"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      <FaEye /> View
                    </button>

                    <button
                      className="btn btn-success btn-sm flex items-center gap-1"
                      onClick={() => handleApprove(blog._id)}
                    >
                      <FaCheck /> Approve
                    </button>

                    <button
                      className="btn btn-error btn-sm flex items-center gap-1"
                      onClick={() => handleDelete(blog._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <div className="bg-base-100 p-6 rounded-lg w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-3">
              {selectedBlog.title}
            </h2>
            <p className="mb-2 text-gray-500">
              By {selectedBlog.author} | {selectedBlog.date} |{" "}
              {selectedBlog.readTime}
            </p>
            <img
              src={selectedBlog.image}
              alt={selectedBlog.title}
              className="w-full max-h-64 object-cover rounded mb-4"
            />
            <p>{selectedBlog.content}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedBlog(null)}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
