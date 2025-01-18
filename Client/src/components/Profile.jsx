import React, { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import Modal from "./Modal";
import { useSelector } from "react-redux";
import useGetProfile from "../customHooks/useGetProfile";


const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, profile } = useSelector((state) =>state.user) 
   
  useGetProfile(user?._id)
  return (
    <div className="h-full flex justify-center items-center">
      {/* Open Modal Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="-ml-1 rounded-md text-white font-medium hover:opacity-90 transition-colors"
      >
        <VscAccount />
      </button>

      {/* Modal */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col space-y-2 text-center">

          {
            profile?._id === user?._id ?(
              <button className="text-lg font-semibold text-black ">Edit Profile</button>
            ):(
              <button className="text-lg font-semibold text-black ">User Profile</button>
            )
          }

          
          <p className="text-sm text-gray-600">
            Make changes to your profile here. Click save when you're done.
          </p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-right text-black">
              Name
            </label>
            <input
              type="text"
              className="text-black col-span-3 h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
              defaultValue={profile?.name}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-right text-black">
              Email
            </label>
            <input
              type="text"
              className="text-black col-span-3 h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
              defaultValue={profile?.email}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => setModalOpen(false)}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:opacity-90 transition"
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
