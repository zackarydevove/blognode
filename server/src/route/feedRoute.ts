import express from 'express';
import { getFeed } from '../controller/feedController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/:userId', jwtCheck, getFeed);

export default router;