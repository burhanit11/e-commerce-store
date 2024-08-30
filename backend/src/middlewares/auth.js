import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(402).json({
        message: "unAuthorized Request.",
      });
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      res.status(403).json({ message: "Invalid Access Token." });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
};
