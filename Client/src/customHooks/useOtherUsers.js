import axios from "axios"
import { USER_API_END_POINT } from "../utils/utils"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../store/slices/userSlice";

const useOtherUsers =(id)=>{
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchOtherUsers = async ()=>{
            try {
                const res =await axios.get(`${USER_API_END_POINT}/getusers/${id}`,{
                    withCredentials:true
                })
                // console.log(getMyProfile(res));
                
                dispatch(getOtherUser(res.data.otherUsers))
            } catch (error) {
                console.log(error);
                
            }

        }
        fetchOtherUsers()
        
    }, [id])
    
}

export default useOtherUsers;