import { Request, Response } from "express"
import UserInterface from "../interfaces/User"
import { prisma } from '../index'

interface FollowUserRequest {
	userId: number,
	target: number,
}

export const followUser = async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
	try {
		const { userId, target } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const targetUser = await prisma.user.findFirst({ where: { id: target }})

		if (!targetUser) {
			return res.status(404).json({ message: "Target user not found" });
		}

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: target,
                },
            },
        });

        if (existingFollow) {
			await prisma.follow.delete({
				where: { id: existingFollow.id }
			});
			return res.status(200).json({ message: "Unfollowed successfully" });
        }

		const newFollow = await prisma.follow.create({
			data: {
				followerId: userId,
				followingId: target,
			}
		})
		
		return res.status(200).json({ data: newFollow, message: "Follow successful" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}