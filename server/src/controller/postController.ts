import { prisma } from '../index'
import { Request, Response } from 'express'

interface CreatePostRequest {
	userId: number,
	content: string
}

export const createPost = async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
	try {
		const { userId, content } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const newPost = await prisma.post.create({
			data: {
				creatorId: userId,
				content: content,
			}
		})

		return res.status(200).json({ data: newPost, message: "New post created successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface DeletePostRequest {
	userId: number,
	postId: number,
}

export const deletePost = async (req: Request<{}, {}, DeletePostRequest>, res: Response) => {
	try {
		const { userId, postId } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

        const post = await prisma.post.findUnique({ 
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.creatorId !== userId) {
            return res.status(403).json({ message: "You're not authorized to delete this post" });
        }

		await prisma.post.delete({
			where: { id: postId }
		});

		return res.status(200).json({ message: "Post has been deleted successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface LikePostRequest {
	userId: number,
	postId: number
}

export const likePost = async (req: Request<{}, {}, LikePostRequest>, res: Response) => {
	try {
		const { userId, postId } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const post = await prisma.post.findFirst({
			where: { id: postId }
		})

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

        if (existingLike) {
			await prisma.like.delete({ where: { id: existingLike.id }});

			const updatedPost = await prisma.post.update({
				where: { id: postId },
				data: {
					likesCount: {
						decrement: 1
					}
				}
			})
			return res.status(200).json({ data: updatedPost, likeCount: -1, message: "You have unliked successfully" });
        }

		await prisma.like.create({
			data: {
				postId: postId,
				userId: userId,
			}
		})

		const updatedPost = await prisma.post.update({
			where: { id: postId },
			data: {
				likesCount: {
					increment: 1
				}
			}
		})

		return res.status(200).json({ data: updatedPost, likeCount: 1, message: "You have liked successfully" });
	
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}


export const checkUserLikedPost = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.query.userId as string);
		const postId = parseInt(req.query.postId as string);

		if (!userId || !postId) {
			return res.status(401).json({ message: "user and post ID are necessary" });
		}

		const post = await prisma.post.findFirst({
			where: { id: postId }
		})

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

        const existingLike = await prisma.like.findFirst({
            where: {
                postId: postId,
                userId: userId
            }
        });

		const userAlreadyLiked = existingLike ? true : false

		return res.status(200).json({ data: userAlreadyLiked, message: "You have liked successfully" });
	
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface CommentPostRequest {
	userId: number,
	postId: number,
	content: string,
}

export const commentPost = async (req: Request<{}, {}, CommentPostRequest>, res: Response) => {
    try {
        const { userId, postId, content } = req.body;

        // Check if user is authorized
        if (!userId) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        // Check if post exists
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Create comment
        const newComment = await prisma.comment.create({
            data: {
                postId: postId,
                userId: userId,
                content: content
            }
        });

		const updatedPost = await prisma.post.update({
			where: { id: postId },
			data: {
				commentsCount: {
					increment: 1
				}
			}
		})

        return res.status(200).json({ data: newComment, commentCount: 1, message: "Comment posted successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

interface DeleteCommentRequest {
    userId: number;
    commentId: number;
}

export const deleteComment = async (req: Request<{}, {}, DeleteCommentRequest>, res: Response) => {
    try {
        const userId = parseInt(req.query.userId as string);
        const commentId = parseInt(req.query.commentId as string);

        // Check if user is authorized
        if (!userId) {
            return res.status(401).json({ message: "You are not authorized" });
        }

        // Check if comment exists
        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if user is the author of the comment
        if (comment.userId !== userId) {
            return res.status(403).json({ message: "You're not authorized to delete this comment" });
        }

        // Delete the comment
        await prisma.comment.delete({
            where: { id: commentId }
        });

		const updatedPost = await prisma.post.update({
			where: { id: comment.postId },
			data: {
				commentsCount: {
					decrement: 1
				}
			}
		})

        return res.status(200).json({ commentCount: -1, message: "Comment has been deleted successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error" });
    }
}