import express from "express";
import auth from "../middleware/auth.js";
import { createTour, getTours } from "../controllers/tourControllers.js";
const tourRouter = express.Router();

tourRouter.post("/", auth, createTour);
tourRouter.get("/", getTours);

export default tourRouter;
