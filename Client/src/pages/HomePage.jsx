import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useOtherUsers from "../customHooks/useOtherUsers";
import { useSelector } from "react-redux";
import useGetPosts from "../customHooks/useGetPosts";
import Card from "../components/Card";

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(true); // State to control sidebar open/close
  const navigate = useNavigate();
  const { user, otherUsers } = useSelector((store) => store.user);
  useOtherUsers(user?._id);
  useOtherUsers(otherUsers?._id);
  useGetPosts(user?._id);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false); // Close sidebar on mobile by default
      } else {
        setOpen(true); // Open sidebar on larger screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex gap-10 bg-black min-h-screen">
      <Sidebar
        isMobile={isMobile}
        otherUsers={otherUsers}
        open={open}
        setOpen={setOpen}
      />
      <div
        className={`flex-grow p-4 transition-all duration-300 ${
          open ? "ml-[18%]" : "ml-16" // Adjust margin based on sidebar state
        }`}
      >
        <Card open={open} /> {/* Pass open state to Card */}
      </div>
      <Outlet />
    </div>
  );
}