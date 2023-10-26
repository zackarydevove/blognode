import { prisma } from "../index";
import { Request, Response } from "express";
import UserInterface from "../interfaces/User";

export const getFeed = async (req: Request, res: Response) => {
    try {
		const userId = parseInt(req.params.userId as string);
		const page =  parseInt(req.query.page as string);
	
    	if (!userId) {
            return res.status(401).json({ message: "User ID is required" });
        }

		const pageNumber = page <= 0 ? page : 1;

        // Fetch users the main user is following
        const following = await prisma.follow.findMany({
            where: {
                followerId: userId
            },
            select: {
                followingId: true
            }
        });

        const followingIds = following.map(f => f.followingId);
		followingIds.push(userId);

        // Fetch the 10 most recent posts created by the users the main user is following
        const posts = await prisma.post.findMany({
            where: {
                creatorId: {
                    in: followingIds
                }
            },
            skip: (pageNumber - 1) * 10,
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
			include: {
				creator: true,
			}
        });

        return res.status(200).json(posts);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const getUserPosts = async (req: Request, res: Response) => {
    try {
		const userId = parseInt(req.params.userId as string);
		const page =  parseInt(req.query.page as string);
	
    	if (!userId) {
            return res.status(401).json({ message: "User ID is required" });
        }

		const pageNumber = page <= 0 ? page : 1;

        const posts = await prisma.post.findMany({
            where: {
                creatorId: userId
            },
            skip: (pageNumber - 1) * 10,
            take: 10,
            orderBy: {
                createdAt: 'desc'
            },
			include: {
				creator: true,
			}
        });
        return res.status(200).json(posts);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};