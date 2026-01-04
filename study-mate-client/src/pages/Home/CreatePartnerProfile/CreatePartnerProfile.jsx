import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

const CreatePartnerProfile = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newPartner = {
      id: Date.now().toString(),
      name: form.name.value,
      profileimage: form.profileimage.value,
      subject: form.subject.value,
      studyMode: form.studyMode.value,
      availabilityTime: form.availabilityTime.value,
      location: form.location.value,
      experienceLevel: form.experienceLevel.value,
      rating: 0,
      patnerCount: 0,
      email: user?.email || form.email.value,
      description: form.description.value,
    };
    fetch("https://study-mate-server-sigma.vercel.app/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPartner),
    })
      .then((res) => res.json())
      .then(() => {
        // console.log("afer data base ", data);
        toast.success("Profile created successfully!");
      });

    // console.log("Profile Created:", newPartner);

    form.reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="bg-base-100  w-full max-w-9/12  rounded-2xl shadow-lg border-2 border-primary">
        <h1 className="text-3xl text-base-200 bg-primary w-fit mx-auto p-4  font-bold text-center rounded-b-2xl shadow-xl">
          Create Profile
        </h1>
        <span className="divider"></span>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 m-10"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={user?.displayName}
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              placeholder="e.g. English Literature"
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Study Mode */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Study Mode
            </label>
            <select
              name="studyMode"
              required
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none bg-base-200"
            >
              <option value="">Select Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          {/* Availability Time */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Availability Time
            </label>
            <input
              type="text"
              name="availabilityTime"
              required
              placeholder="e.g. Morning 10–1 PM"
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Khulna, Bangladesh"
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              required
              className="w-full border border-accent rounded-lg px-4 py-2 bg-base-200 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          {/* Profile Image */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-accent mb-1 block">
              Profile Image URL
            </label>
            <input
              type="url"
              name="profileimage"
              required
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-accent rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-accent mb-1 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              disabled={!!user?.email}
              placeholder="Your email address"
              className="w-full border border-accent rounded-lg px-4 py-2 text-accent outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-accent mb-1 block">
              Short Description
            </label>
            <textarea
              name="description"
              rows="3"
              placeholder="Write something about yourself, your goals, and study habits..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 ">
            <button
              type="submit"
              className="w-full mx auto btn btn-primary font-semibold py-3 rounded-lg transition-all duration-200"
            >
              Create Partner Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePartnerProfile;
