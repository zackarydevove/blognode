import express from "express";
import { getUserByEmail, 
	deleteUser, 
	getUserById, 
	getThreeRandomUsers, 
	changeFirstname,
	changeLastname,
	changePassword
} from "../controller/userController";

const router = express.Router();

router.get("/email", getUserByEmail);
router.delete("/", deleteUser);
router.get("/:id", getUserById);
router.get("/random/:id", getThreeRandomUsers);
router.patch("/firstname", changeFirstname);
router.patch("/lastname", changeLastname);
router.patch("/password", changePassword);

export default router;