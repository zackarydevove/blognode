interface UserInterface {
	id: number;
	email: string;
	password: string;
	username: string;
	followersCount: number;
	location: string;
	job: string;
	followers: FollowInterface[];
	following: FollowInterface[];
	posts: PostInterface[];
	likes: LikeInterface[];
	comments: CommentInterface[];
}
  
interface FollowInterface {
	id: number;
	followerId: number;
	followingId: number;
	createdAt: Date;
	follower: UserInterface;
	following: UserInterface;
}
  
interface PostInterface {
	id: number;
	creatorId: number;
	creator: UserInterface;
	content: string;
	createdAt: Date;
	likesCount: number;
	likes: LikeInterface[];
	commentsCount: number;
	comments: CommentInterface[];
}
  
interface LikeInterface {
	id: number;
	postId: number;
	post: PostInterface;
	userId: number;
	user: UserInterface;
}
  
interface CommentInterface {
	id: number;
	postId: number;
	post: PostInterface;
	userId: number;
	user: UserInterface;
	content: string;
	createdAt: Date;
}
  
  export type { UserInterface, FollowInterface, PostInterface, LikeInterface, CommentInterface };
  