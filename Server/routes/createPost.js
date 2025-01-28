import express from 'express'
import { createPost, deletePost, getAllPosts, getFollowingUserPosts, likeOrDislike } from '../controllers/createPostController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/create").post(authMiddleware,createPost)
router.route("/delete/:id").delete(authMiddleware,deletePost)
router.route("/like/:id").put(authMiddleware,likeOrDislike)
router.route("/allposts/:id").get(authMiddleware,getAllPosts)
router.route("/followingposts/:id").get(authMiddleware,getFollowingUserPosts)


export default router;
