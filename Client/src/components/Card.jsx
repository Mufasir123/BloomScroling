import React, { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import useGetPosts from "../customHooks/useGetPosts";

import axios from "axios";
import { toast } from "react-toastify";
import { setRefresh } from "../store/slices/postSlice";

const Card = () => {
  const dispatch = useDispatch();
  const boxWrapper = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: null,
    y: null,
  });
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  useGetPosts(posts);

  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const [overlayColor, setOverlayColor] = useState({ x: 0, y: 0 });

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    let { left, top } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    setOverlayColor({ x, y });
  };

  const likeOrDislike = async (id) => {
    try {
      const res = await axios.put(
        `${POST_API_END_POINT}/like/${id}`,
        { id: user?._id },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      dispatch(setRefresh());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      // toast.error(error.response.message)
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 ml-[20%]">
      {posts?.map((item) => (
        <div key={item?._id} className="w-full">
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={boxWrapper}
            className="group relative border rounded-lg p-[2px] bg-[#eeeeee15] w-full mt-5"
          >
            {isHovered && (
              <div
                className="pointer-events-none absolute opacity-0 z-50 rounded-xl w-full h-full group-hover:opacity-100 transition duration-300"
                style={{
                  background: `
                    radial-gradient(
                      250px circle at ${overlayColor.x}px ${overlayColor.y}px,
                      rgba(255, 255, 255, 0.068),
                      transparent 80%
                    )
                  `,
                }}
              />
            )}

            <div
              className="absolute opacity-0 group-hover:opacity-100 z-10 inset-0 bg-fixed rounded-lg"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, #ffffff76 0%,transparent 20%,transparent) fixed`,
              }}
            ></div>
            <div className="relative text-center z-10 px-8 py-6 rounded-lg w-full bg-cover bg-black h-full">
              <h1 className="text-3xl pt-6 font-medium tracking-tight text-white">
                {item?.name}
              </h1>
              <p className="pt-2 text-gray-300 capitalize">
                {item?.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
