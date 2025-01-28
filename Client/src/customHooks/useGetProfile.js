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
                const token = localStorage.getItem("token");
                const res =await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    withCredentials:true
                })
                dispatch(getMyProfile(res.data.user))
            } catch (error) {
                console.log(error);
                
                
            }

        }
        fetchMyProfile() 
    }, [])
    
}

export default useGetProfile;