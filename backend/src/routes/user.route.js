import express from 'express'
import { getMe, loginUser, registerUser } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
const router = express.Router()

router.post("/signup",registerUser)
router.post("/login",loginUser)
router.get('/me',protect,getMe)

export default router;