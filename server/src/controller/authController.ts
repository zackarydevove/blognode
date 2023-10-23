import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { prisma } from '../index';


interface LoginRequestBody {
	email: string,
	password: string,
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
	try {
		const { email, password } = req.body;
	
		const user = await prisma.user.findUnique({
			where: {
				email
			},
		});
	
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(400).json({ message: "Incorrect email or password" });
		}
	
		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
	
		return res.json({ token });
	} catch (error) {
		console.error("Error logging in:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface RegisterRequestBody {
	email: string,
	password: string,
	confirmPassword: string,
	firstname: string,
	lastname: string,
}

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
	try {
		const { email, password, confirmPassword, firstname, lastname } = req.body;

		const user = await prisma.user.findUnique({
			where: {
				email,
			}
		});

		if (user) {
			return res.status(400).json({ message: "Email already used" });
		}
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Passwords doesn't match" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await prisma.user.create({
			data: {
				email: email,
				password: hashedPassword,
				firstname: firstname,
				lastname: lastname,
			}
		})
		const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
		return res.status(200).json({ user: newUser, token: token, message: "You have successfully created a new account."})
	} catch (error) {
		console.error("Error register:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const logout = (req: Request, res: Response) => {
	console.log("yo");
}