import { prisma } from "../index";
import { Request, Response } from "express";
import UserInterface from "../interfaces/User";

interface GetFeedRequest {
	user: UserInterface
}

export const getFeed = async (req: Request<{}, {}, GetFeedRequest>, res: Response) => {
    try {
        const { user } = req.body;

        if (!user || !user.id) {
            return res.status(401).json({ message: "User ID is required" });
        }

        // Fetch users the main user is following
        const following = await prisma.follow.findMany({
            where: {
                followerId: user.id
            },
            select: {
                followingId: true
            }
        });

        const followingIds = following.map(f => f.followingId);

        // Fetch the 10 most recent posts created by the users the main user is following
        const posts = await prisma.post.findMany({
            where: {
                creatorId: {
                    in: followingIds
                }
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10
        });

        return res.status(200).json(posts);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}