import express from "express";
import { getUserByEmail, 
	getUserByToken,
	getUserByUsername,
	deleteUser, 
	getUserById, 
	getThreeRandomUsers, 
	changeUsername,
	changePassword,
	searchUsers
} from "../controller/userController";
import { jwtCheck } from "../middleware/jwtCheck";

const router = express.Router();

router.get("/email", getUserByEmail);
router.get("/username", getUserByUsername);
router.get("/", jwtCheck, getUserByToken);
router.delete("/", jwtCheck, deleteUser);
router.get("/:id", jwtCheck, getUserById);
router.get("/random/:id", jwtCheck, getThreeRandomUsers);
router.patch("/username", jwtCheck, changeUsername);
router.patch("/password", jwtCheck, changePassword);
router.get("/search/:term", jwtCheck, searchUsers);

export default router;