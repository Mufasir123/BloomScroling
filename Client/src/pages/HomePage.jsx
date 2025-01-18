import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import CardS from "../components/CardS";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../customHooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetPosts from "../customHooks/useGetPosts";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const {user, otherUsers} = useSelector(store=>store.user)
  useOtherUsers(user?._id)
  useGetPosts(user?._id)

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [])
  
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex gap-10 bg-black min-h-screen">
      <Sidebar isMobile={isMobile} otherUsers={otherUsers} />
      <div className="flex-grow p-4">
        <CardS/>
      </div>
      <Outlet />
    </div>
  );
}

