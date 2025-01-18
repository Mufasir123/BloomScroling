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

export const getAllPosts = async(req, res)=>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id)

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