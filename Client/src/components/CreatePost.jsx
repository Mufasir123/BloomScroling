import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Modal from "./Modal";
import axios from "axios";
import { POST_API_END_POINT } from "../utils/utils";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { setRefresh } from "../store/slices/postSlice";


const CreatePost = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const {user} = useSelector(store=>store.user)
  const dispatch = useDispatch()

  
  const submitHandler =async () => {

    try {
      const token = localStorage.getItem("token");
        const res = await axios.post(`${POST_API_END_POINT}/create`,{description,id:user?._id},{
            headers:{
              Authorization: `Bearer ${token}`,
                "Content-Type":"application/json"
            },
            withCredentials:true
        })
        dispatch(setRefresh())
        if(res.data.success){
            toast.success(res.data.message)
            
        }
    } catch (error) {
        toast.error(error.response.data.message)
    }

    setModalOpen(false);
    setDescription("");

  }
  return (
    <div className="h-full flex justify-center items-center">
      {/* Open Modal Button */}
      <button
        onClick={() => setModalOpen(true)}
        className="-ml-1 rounded-md text-white font-medium hover:opacity-90 transition-colors"
      >
        <FaPlus />
      </button>

      {/* Modal */}
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <p className="text-sm text-gray-600">
            Add a description so that other users can know more and learn.
          </p>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-sm font-medium text-right text-black">
              Description
            </label>
            <input
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
              type="text"
              className="text-black col-span-3 h-9 w-full rounded-md border border-gray-300 px-3 py-1 text-sm"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => submitHandler()}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:opacity-90 transition"
          >
            Thanks for sharing
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
