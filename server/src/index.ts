import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoute from './route/authRoute';
import feedRoute from './route/feedRoute';
import followRoute from './route/followRoute';
import postRoute from './route/postRoute';
import userRoute from './route/userRoute';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
const PORT = 8000;
export const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true,
}));

app.use('/api/auth', authRoute);
app.use('/api/feed', feedRoute);
app.use('/api/follow', followRoute);
app.use('/api/post', postRoute);
app.use('/api/user', userRoute);

prisma.$connect()
	.then(() => {
		console.log('Connected to the database successfully.');
	})
	.catch((error: any) => {
		console.error('Error connecting to the database:', error);
	});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})