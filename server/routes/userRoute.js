import express from "express";
import {
  // googleSignIn,
  signin,
  signup,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
// userRouter.post("/googleSignIn", googleSignIn);

export default userRouter;
