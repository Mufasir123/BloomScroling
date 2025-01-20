import mongoose from "mongoose";
import { bloom } from "../models/bloomSchema.js"
import { User } from "../models/userSchema.js";

export const createPost = async (req, res)=>{
    try {
        const {description, id} = req.body;
        if(!description || !id){

            return res.status(401).json({
                message:"Fields are required",
                success:false
            })
        }

        await bloom.create({
            description,
            userId:id
        })

        return res.status(201).json({
            message:"Post created Successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const  deletePost =async (req, res)=>{
    try {
        const {id} = req.params;
        await bloom.findByIdAndDelete(id)
        return res.status(200).json({
            message:"Post deleted successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

export const likeOrDislike = async(req, res)=>{
    try {
        const loggedInUserId = req.body.id;

        const postId = req.params.id

        const post = await bloom.findById(postId);
        if(post.like.includes(loggedInUserId)){
            //dislike
            await bloom.findByIdAndUpdate(postId,{$pull:{like:loggedInUserId}});
            return res.status(200).json({
                message:"user disliked your post",
                success:true
            })
        }else{
            await bloom.findByIdAndUpdate(postId,{$push:{like:loggedInUserId}})
            return res.status(200).json({
                message:"user liked your post",
                success:true
            })
        }
    } catch (error) {
        
    }
}

export const getAllPosts = async (req, res)=>{
    try {
        const {id} = req.params.id;
        const loggedInUser = await User.findById(id)
        console.log("logged in user:",loggedInUser);
        

        const loggedInUserPosts = await bloom.find({userId:id})
        const followingUserPost = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return bloom.find({userId:otherUserId})
        }))

        return res.status(200).json({
            posts:loggedInUserPosts.concat(...followingUserPost)
        })

    } catch (error) {
        console.log(error);
        
    }
}

// export const getAllPosts = async (req, res) => {
//     try {
//         // Extract the ID from req.params
//         const { id } = req.params; 

//         // Validate the ID as a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid user ID format" });
//         }

//         // Find the logged-in user by ID
//         const loggedInUser = await User.findById(id);
//         if (!loggedInUser) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         console.log("Logged-in user ID:", id);

//         // Fetch posts of the logged-in user
//         const loggedInUserPosts = await bloom.find({ userId: id });

//         // Fetch posts from users the logged-in user is following
//         const followingUserPost = await Promise.all(
//             loggedInUser.following.map(async (otherUserId) => {
//                 if (mongoose.Types.ObjectId.isValid(otherUserId)) {
//                     return bloom.find({ userId: otherUserId });
//                 } else {
//                     console.warn("Invalid user ID in 'following':", otherUserId);
//                     return [];
//                 }
//             })
//         );
        

//         // Combine all posts into a single array
//         const allPosts = loggedInUserPosts.concat(...followingUserPost.flat());

//         return res.status(200).json({ posts: allPosts });
//     } catch (error) {
//         console.error("Error fetching posts:", error.message);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };
 // Import your Post model

// export const getAllPosts = async (req, res) => {
//     try {
//         // Extract the user ID from the request parameters
//         const { id } = req.params;

//         // Validate the ID to ensure it's a valid ObjectId
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({ error: "Invalid user ID" });
//         }

//         // Fetch the user by ID
//         const loggedInUser = await User.findById(id);
//         if (!loggedInUser) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Fetch posts by the logged-in user
//         const loggedInUserPosts = await Post.find({ userId: id });

//         // Fetch posts from users the logged-in user is following
//         const followingUserPosts = await Promise.all(
//             loggedInUser.following.map((followingId) => {
//                 if (mongoose.Types.ObjectId.isValid(followingId)) {
//                     return Post.find({ userId: followingId });
//                 } else {
//                     console.warn("Invalid following ID:", followingId);
//                     return [];
//                 }
//             })
//         );

//         // Combine all posts into a single array and sort them by creation date (optional)
//         const allPosts = loggedInUserPosts
//             .concat(...followingUserPosts.flat())
//             .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         // Return the combined posts
//         return res.status(200).json({ posts: allPosts });
//     } catch (error) {
//         console.error("Error fetching posts:", error);
//         return res.status(500).json({ error: "Internal server error" });
//     }
// };

export const getFollowingUserPosts = async(req, res)=>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id)
        const followingUserPost = await Promise.all(loggedInUser.following.map((otherUserId)=>{
            return bloom.find({userId:otherUserId})
        }))

        return res.status(200).json({
            posts:[].concat(...followingUserPost)
        })

    } catch (error) {
        console.log(error);
        
    }
}