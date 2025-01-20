import axios from "axios"
import { POST_API_END_POINT} from "../utils/utils"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../store/slices/postSlice";

const useGetPosts =(id)=>{
    const dispatch = useDispatch();
    const {refresh} = useSelector(state=>state.posts)
    useEffect(() => {
        const fetchPosts = async ()=>{
            try {
                const res =await axios.get(`${POST_API_END_POINT}/allposts/${id}`,{
                    withCredentials:true
                })
                
                dispatch(getAllPosts(res.data.posts))
            } catch (error) {
                console.log(error);
                
            }

        }
        fetchPosts()
        
    }, [refresh])
    
}

export default useGetPosts;