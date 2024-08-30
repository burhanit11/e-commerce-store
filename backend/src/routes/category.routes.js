import express from "express";
import {
  login,
  signup,
  getUserProfile,
} from "../controllers/users.controllers.js";
import { verifyJWT } from "../middlewares/auth.js";
// import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getUserProfile").get(verifyJWT, getUserProfile);

export default router;
