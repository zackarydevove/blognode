import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface jwtCheckExtendRequestBody extends Request {
	user?: string | JwtPayload,
}

export const jwtCheck = (req: jwtCheckExtendRequestBody, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
  
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
			if (err) return res.sendStatus(403);
				req.user = user;
			next();
		});
	} else {
		res.sendStatus(401);
	}
};