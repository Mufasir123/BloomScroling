import { useState, useEffect } from "react";
import { IoHomeOutline} from "react-icons/io5";
import {VscAccount, VscExtensions } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import { RiLogoutBoxFill } from "react-icons/ri";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/utils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getMyProfile, getOtherUser, getUser } from "../store/slices/userSlice";
import {motion} from 'framer-motion'
import { BiLogoBlogger } from "react-icons/bi";
import { TbPlayerSkipBackFilled } from "react-icons/tb";

const Sidebar = ({ isMobile, otherUsers, open, setOpen }) => {
  // const [open, setOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const logoutHandler =async ()=>{

    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`)
      dispatch(getUser(null))
      dispatch(getOtherUser(null))
      dispatch(getMyProfile(null))
      localStorage.removeItem("token");
      navigate("/")
      toast.success(res.data.message)
      if(res.data.success){
        window.location.href = "/login"
      }
    } catch (error) {
      console.log(error);

  }
}

  return (
    <div
      className={`${open ? "w-[18%]" : "w-16"} bg-black h-screen p-2 pt-8 fixed duration-300 z-[1000] top-2 flex flex-col items-center  `}
    >
      {!isMobile && (
        <TbPlayerSkipBackFilled  onClick={() => setOpen(!open)} className={`absolute cursor-pointer text-white text-2xl -right-3 top-0 w-7 border-dark-purple border-2 rounded-full ${!open ? "rotate-180" : ""}`}/>
      )}
      <div className="flex gap-x-4 items-center">
      <BiLogoBlogger  className={`w-8 cursor-pointer duration-500 text-white text-2xl ${open ? "rotate-[360deg]" : ""}`} />
        <h1
          className={`text-white origin-left font-medium duration-200 cursor-pointer ${
            !open ? "hidden" : ""
          }`}
        >
          Bloom
        </h1>
      </div>
      <ul className="pt-6 ">
        <li
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 bg-light-white"
        >
          <Link to="/home" className="text-white text-2xl">
            <IoHomeOutline />
          </Link>
          <Link
            to="/home"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            Home
          </Link>
        </li>
        <li
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
        >
          <Link to="/home" className="text-white text-2xl">
          <CreatePost/>
          </Link>
          <Link
            to="/home"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            Create Post
          </Link>
        </li>
        <li
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
        >
          <Link to="/posts" className="text-white text-2xl">
            <VscExtensions />
          </Link>
          <Link to="/posts"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            Posts
          </Link>
        </li>
        <li
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
        >
          <Link className="text-white text-2xl ">
            <Profile/>
          </Link>
          <Link
            // to="/home/profile"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            Profile
          </Link>
        </li>
        <li
        onClick={logoutHandler}
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2 -ml-1"
        >
          <Link className="text-white text-2xl ">
          <RiLogoutBoxFill />
          </Link>
          <Link
            // to="/home/profile"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            Logout
          </Link>
        </li>


        <p className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200 text-white mt-16 `}>Other Users </p>
        {otherUsers?.map((user)=>{
          return(
            <li key={user?._id}
          className="flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 mt-2"
        >
          <Link className="text-white text-2xl ">
            {/* <Profile/> */}
            <VscAccount />
          </Link>
          <Link
            // to="/home/profile"
            className={`${!open ? "hidden" : ""} text-lg origin-left cursor-pointer duration-200`}
          >
            {user?.name}
          </Link>
        </li>
          )
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
