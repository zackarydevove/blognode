import express from "express";
import { createPost, 
	deletePost,
	likePost, 
	commentPost, 
	deleteComment
} from "../controller/postController";
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post("/", jwtCheck, createPost);
router.delete("/", jwtCheck, deletePost);
router.post("/like", jwtCheck, likePost);
router.post("/comment", jwtCheck, commentPost);
router.delete("/comment", jwtCheck, deleteComment);

export default router;