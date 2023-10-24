import { prisma } from '../index'
import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import UserInterface from '../interfaces/User';
import { validateEmail } from '../utils/validateEmail';
import { validateName } from '../utils/validateName';

interface GetUserRequest{
	email: string
}

export const getUser = async (req: Request<{}, {}, GetUserRequest>, res: Response) => {
	try {
		const { email } = req.body;

		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		  }

		const user = await prisma.user.findFirst({
			where: { email }
		})
		if (!user) {
			console.log(`User with email ${email} not found`);
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ data: user, message: "User found successfully" });
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface DeleteUserRequest {
	user: UserInterface,
}

export const deleteUser = async (req: Request<{}, {}, DeleteUserRequest>, res: Response) => {
	try {
		const { user } = req.body;
		
		if (!user.id) {
			return res.status(404).json({ message: "User ID is required" });
		}

		const deletedUser = await prisma.user.delete({
			where: { id: user.id }
		})

		res.sendStatus(200).json({ message: "Your account has been deleted successfully" });
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface ChangeFirstnameRequest {
	user: UserInterface,
	firstname: string,
}

export const changeFirstname = async (req: Request<{}, {}, ChangeFirstnameRequest>, res: Response) => {
	try {
		const { user, firstname } = req.body;

		if (!user.id) {
			return res.status(401).json({ message: "User ID is required" });
		}

		if (!validateName(firstname)) {
			return res.status(400).json({ message: "Invalid first name" });
		  }

		if (firstname === user.firstname) {
			console.log("User can't change with the same firstname");
			return res.status(404).json({ message: "The firstnames are the same" });
		}

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { firstname: firstname },
		})
		
		return res.status(200).json({ data: updatedUser, message: "User's firstname updated successfully" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface ChangeLastnameRequest {
	user: UserInterface,
	lastname: string,
}

export const changeLastname = async (req: Request<{}, {}, ChangeLastnameRequest>, res: Response) => {
	try {
		const { user, lastname } = req.body;

		if (!user.id) {
			return res.status(401).json({ message: "User ID is required" });
		}


		if (!validateName(lastname)) {
			return res.status(400).json({ message: "Invalid last name" });
		}
		
		if (lastname === user.lastname) {
			console.log("User can't change with the same lastname");
			return res.status(404).json({ message: "The lastnames are the same" });
		}

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { lastname: lastname },
		})
		
		return res.status(200).json({ data: updatedUser, message: "User's lastname updated successfully" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface ChangePasswordRequest {
	user: UserInterface,
	currentPassword: string,
	newPassword: string,
	confirmNewPassword: string,
}

export const changePassword = async (req: Request<{}, {}, ChangePasswordRequest>, res: Response) => {
	try {
		const { user, currentPassword, newPassword, confirmNewPassword } = req.body;

		if (!user.id) {
			return res.status(401).json({ message: "User ID is required" });
		}

		if (!(await bcrypt.compare(currentPassword, user.password))) {
			return res.status(401).json({ message: "Incorrect password" });
		}
		
		if (newPassword !== confirmNewPassword){
			return res.status(401).json({ message: "New password doesn't match" });
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { password: hashedNewPassword },
		})
		
		return res.status(200).json({ data: updatedUser, message: "User's password updated successfully" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}