import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const isAuthenticated = async(req, res, next)=>{
    try {
        const token = req.cookies.token;
        console.log(token);

        if(!token){
            return res.status(401).json({
                message:"User is not avilable so first create account to create post",
                success:false
            })
        }
        
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decode.userId;
        next()
        
    } catch (error) {
        console.log(error);
        
    }
}

export default isAuthenticated