import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaFastBackward } from "react-icons/fa";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  
  const navigate = useNavigate();
  const {user} = useSelector(store=>store.user)
   useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, [])

  return (
    <div className="bg-black">

      <Link to="/home" >
      <FaFastBackward className=" text-white ml-5  " />
      </Link>
      
    <div className="h-screen bg-black flex justify-center items-start">
      {/* Display Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map((item) => (
          <div key={item?._id} className="w-full">
            <div className="relative p-[2px] bg-[#eeeeee15] border w-full mt-5 rounded-lg">
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
    </div>
    </div>
  );
};

export default Posts;
