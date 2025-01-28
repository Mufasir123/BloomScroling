import jwt from 'jsonwebtoken'
import User  from '../models/userSchema.js'
import dotenv from 'dotenv'

dotenv.config()

const authMiddleware = async (req, res, next) => {
    try {
        const token  = req.header('Authorization')?.replace('Bearer ','');

        if(!token){
            return res.status(401).json({
                error:'Authentication required'
            })
        }

        const decode = jwt.verify(token, process.env.TOKEN_SECRET);

        const user = await User.findById(decode.userId)

        if(!user){
            console.log("User not found");
            throw new Error()
        }

        req.token = token
        req.user = user;

        next();

    } catch (error) {
        console.log("Error in authMiddleware:", error);
        res.status(401).json({ error: 'Authentication error' });
    }
}

export default authMiddleware;