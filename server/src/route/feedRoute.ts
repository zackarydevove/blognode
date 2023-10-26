import express from 'express';
import { getFeed, getUserPosts } from '../controller/feedController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.get('/:userId', jwtCheck, getFeed);
router.get('/posts/:userId', jwtCheck, getUserPosts);

export default router;