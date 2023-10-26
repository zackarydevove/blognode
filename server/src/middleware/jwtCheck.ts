import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface jwtCheckExtendRequestBody extends Request {
	userId?: string | JwtPayload,
}

export const jwtCheck = (req: jwtCheckExtendRequestBody, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
			if (err) {
				res.status(401).json({ message: "No token provided" });
				return ;
			}
			if (user && typeof user === 'object' && 'id' in user) {
				req.userId = user.id;
				next();
			}
		});
	} else {
		res.sendStatus(401);
	}
};