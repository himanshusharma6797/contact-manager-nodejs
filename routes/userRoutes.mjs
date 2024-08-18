import express from "express"
import UserController from "../controllers/userController.mjs";
import validateToken from "../middleware/validateTokenHandler.mjs";

const router = express.Router();

router.route('/signup').post(UserController.userSignup)

router.route('/login').post(UserController.userLogin)

router.route('/current').get(validateToken, UserController.currentUser)

export default router;
