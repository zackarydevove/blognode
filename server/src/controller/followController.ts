import { Request, Response } from "express"
import UserInterface from "../interfaces/User"
import { prisma } from '../index'

interface FollowUserRequest {
	userId: number,
	targetId: number,
}

export const followUser = async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
	try {
		const { userId, targetId } = req.body;

		console.log("Enter followUser\n");

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}
		
        if (userId === targetId) {
            return res.status(400).json({ message: "You cannot follow yourself." });
        }

		const targetUser = await prisma.user.findFirst({ where: { id: targetId }})

		if (!targetUser) {
			return res.status(404).json({ message: "Target user not found" });
		}

		console.log("userId: ", userId, "\ntarget: ", targetId, "\n");

        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetId,
                },
            },
        });

        if (existingFollow) {
			console.log("existingFollow: ", existingFollow);
			await prisma.follow.delete({
				where: { id: existingFollow.id }
			});

			await prisma.user.update({
                where: { id: userId },
                data: {
                    followersCount: { decrement: 1 }
                }
            });

			return res.status(200).json({ message: "Unfollowed successfully" });
        }

		const newFollow = await prisma.follow.create({
			data: {
				followerId: userId,
				followingId: targetId,
			}
		})

		await prisma.user.update({
            where: { id: userId },
            data: {
                followersCount: { increment: 1 }
            }
        });

		console.log("new follow: ", newFollow);
		
		return res.status(200).json({ data: newFollow, message: "Followed successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const checkFollow = async (req: Request, res: Response) => {
    try {
		console.log(req);
        const userId = parseInt(req.query.userId as string);
        const targetId = parseInt(req.query.targetId as string);

		if (!userId || !targetId) {
			return res.status(401).json({ message: "Need userId and targetId" });
		}

        const follow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetId,
                },
            },
        });

        if (follow) {
            return res.status(200).json({ isFollowing: true });
        } else {
            return res.status(200).json({ isFollowing: false });
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}