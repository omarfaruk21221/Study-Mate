import { useState } from "react";
import { toast } from "react-toastify";

const ConnUpdateModal = ({ editingData, onUpdated }) => {
  const { id, subject, studyMode } = editingData;

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const studyMode = form.studyMode.value;
    // console.log({ subject, studyMode });
    const updatePartner = {
      partnerSubject: subject,
      partnerStudyMode: studyMode,
    };
    console.log(updatePartner);
    // === update partners =====
    fetch(`https://study-mate-server-sigma.vercel.app/connections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatePartner),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Updated Successfully!");
        form.reset();
        document.getElementById("my_modal_5").close();
        if (onUpdated) onUpdated();
      })
      .catch(() => toast.error("Update failed!"));
  };
  return (
    <div>
      {/* Open the modal using document.getElementById('my_modal_5').showModal() */}
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle border border-primary"
      >
        <div className="modal-box  p-0 borde">
          <h2 className="text-xl text-base-200 bg-primary w-fit mx-auto p-4 font-bold text-center rounded-b-2xl shadow-xl">
            Update Connection
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 p-10">
            <div>
              <label className="block text-lg font-medium text-primary ">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                placeholder={subject}
                className="input input-bordered w-full text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-primary ">
                Study Mode
              </label>
              <input
                type="text"
                placeholder={studyMode}
                name="studyMode"
                className="input input-bordered w-full  text-primary"
                required
              />
            </div>
            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => document.getElementById("my_modal_5").close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ConnUpdateModal;
