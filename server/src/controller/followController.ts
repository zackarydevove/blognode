import { Request, Response } from "express"
import UserInterface from "../interfaces/User"
import { prisma } from '../index'

interface FollowUserRequest {
	user: UserInterface,
	target: number,
}

export const followUser = async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
	try {
		const { user, target } = req.body;
		if (!user.id) {
			return res.sendStatus(401).json({ message: "You are not authorized" });
		}

		const targetUser = await prisma.user.findFirst({ where: { id: target }})

		if (!targetUser) {
			return res.sendStatus(404).json({ message: "Target user not found" });
		}

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: target,
                },
            },
        });

        if (existingFollow) {
			const deletedFollow = await prisma.follow.delete({
				where: { id: existingFollow.id }
			});
			return res.status(200).json({ message: "Unfollowed successfully" });
        }

		const newFollow = await prisma.follow.create({
			data: {
				followerId: user.id,
				followingId: target,
			}
		})
		
		return res.sendStatus(200).json({ data: newFollow, message: "Follow successful" });
	} catch (err) {
		console.log(err);
		return res.sendStatus(500).json({ message: "Internal server error" });
	}
}