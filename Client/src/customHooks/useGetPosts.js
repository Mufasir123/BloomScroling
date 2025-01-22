import axios from "axios";
import { POST_API_END_POINT } from "../utils/utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/slices/postSlice";

const useGetPosts = (id) => {
    const dispatch = useDispatch();
    const { refresh } = useSelector(state => state.posts);

    useEffect(() => {
        let isMounted = true;

        const fetchPosts = async () => {
            try {
                // Validate ID
                if (!id || typeof id !== "string") {
                    console.error("Invalid user ID:", id);
                    return;
                }
                const res = await axios.get(`${POST_API_END_POINT}/allposts/${id}`, {
                    withCredentials: true
                });


                if (isMounted) {
                    dispatch(getAllPosts(res.data.posts));
                }
            } catch (error) {
                console.error(
                    "Error fetching posts:",
                    error.response ? error.response.data : error.message
                );
            }
        };

        fetchPosts();

        return () => {
            isMounted = false;
        };
    }, [id, refresh, dispatch]);

    return null; // Ensure the hook returns something if needed
};

export default useGetPosts;
