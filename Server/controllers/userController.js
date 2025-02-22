import  User  from "../models/userSchema.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const Register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
        // validation
        if(!name || !email || !password){
            return res.status(401).json({
                message:"All fields are required",
                success:false
            })
        }


        // if user is already exist
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                message:"User already exist",
                success:false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        // create user 
        await User.create({
            name:name,
            email:email,
            password:hashedPassword
        })

        return res.status(201).json({
            message: `Account created successfully for ${User.name || User.email}`,
            success:true
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false,
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password ",
                success: false,
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Generate token
        const tokenData = {
            userId: user._id,
        };

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });

        // Set token in cookies and send response
        return res
            .status(201)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
            })
            .json({
                success: true,
                message: `Welcome back ${user.name || user.email}`,
                user: {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                },
                token
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong. Please try again later.",
            success: false,
        });
    }
};

export const Logout = (req, res)=>{
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        message:"User logged out successfully.",
        success:true
    })
}


export const getMyProfile = async(req, res)=>{
    try {
        const id= req.params.id;
        const user =await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        }) 
    } catch (error) {
        console.log(error);
        
    }
}

export const getOtherusers = async(req, res)=>{
    try {
        const {id}=req.params;
        const otherUsers = await User.find({_id:{$ne:id}}).select("-password")

        if(!otherUsers){
            return res.status(401).json({
                message:"Currently do not have any user"
            })
        }
        return res.status(200).json({
            otherUsers
        })
    } catch (error) {
        console.log(error);
        
    }
}


export const follow = async(req, res)=>{
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//madhu
        const user = await User.findById(userId);//shahid
        if(!user.followers.includes(loggedInUserId)){
            await user.updateOne({$push:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$push:{following:userId}})
        }else{
            res.status(400).json({
                message:`User already followed to ${user.name}`
            })
        }

        return res.status(200).json({
            message:`${loggedInUser.name} just followed to ${user.name}`,
            success:true
        })
    } catch (error) {
        
    }
}

export const unFollow = async(req,res)=>{
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);//madhu
        const user = await User.findById(userId);//shahid
        if(loggedInUser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}});
            await loggedInUser.updateOne({$pull:{following:userId}})
        }else{
            res.status(400).json({
                message:`User has not followed yet`
            })
        }

        return res.status(200).json({
            message:`${loggedInUser.name}  unfollowed to ${user.name}`,
            success:true
        })
    } catch (error) {
        
    }
}