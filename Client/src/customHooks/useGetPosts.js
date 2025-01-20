import axios from "axios"
import { POST_API_END_POINT} from "../utils/utils"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/slices/postSlice";
import mongoose from "mongoose";

const useGetPosts =(_id)=>{
    const dispatch = useDispatch();
    const {refresh} = useSelector(state=>state.posts)
    useEffect(() => {
        let isMounted = true
        const fetchPosts = async ()=>{
            try {
                if (!mongoose.Types.ObjectId.isValid(_id)) {
                    // console.error("Invalid ID format:", _id);
                    return;
                  }
                // if (typeof _id !== 'string' || _id.trim() === '') {
                //     console.error('Invalid ID format:', _id);
                //     return;
                //   }
                console.log(`Fetching posts for user ID: ${_id}`);
                const res =await axios.get(`${POST_API_END_POINT}/allposts/${_id}`,{
                    withCredentials:true
                })
                if(isMounted){
                    dispatch(getAllPosts(res.data.posts))
                }
            } catch (error) {
                console.error('Error fetching posts:', error.response ? error.response.data : error.message);
                
            }

        }
        fetchPosts()

        return ()=>{
            isMounted = false
        }
        
    }, [_id,refresh,dispatch])

    return null
    
}

export default useGetPosts;