import axios from "axios"
import { USER_API_END_POINT } from "../utils/utils"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../store/slices/userSlice";

const useGetProfile =(id)=>{
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchMyProfile = async ()=>{
            try {
                const res =await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                })
                // console.log(getMyProfile(res));
                
                dispatch(getMyProfile(res.data.user))
            } catch (error) {
                console.log(error);
                
            }

        }
        fetchMyProfile() 
    }, [])
    
}

export default useGetProfile;