import express from "express";
import { createPost, 
	deletePost,
	likePost, 
	checkUserLikedPost,
	commentPost, 
	deleteComment,
	getPostComments
} from "../controller/postController";
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post("/", jwtCheck, createPost);
router.delete("/", jwtCheck, deletePost);
router.post("/like", jwtCheck, likePost);
router.get("/like", jwtCheck, checkUserLikedPost);
router.post("/comment", jwtCheck, commentPost);
router.delete("/comment", jwtCheck, deleteComment);
router.get("/commentsss", jwtCheck, getPostComments);

export default router;