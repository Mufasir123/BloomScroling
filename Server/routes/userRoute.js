import express from 'express'
import { follow, getMyProfile, getOtherusers, Login, Logout, Register, unFollow } from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route("/register").post(Register)
router.route("/login").post(Login)
router.route("/logout").get(Logout)
router.route("/profile/:id").get(authMiddleware,getMyProfile)
router.route("/getusers/:id").get(authMiddleware,getOtherusers)
router.route("/follow/:id").post(authMiddleware,follow)
router.route("/unfollow/:id").post(authMiddleware,unFollow)


export default router;
