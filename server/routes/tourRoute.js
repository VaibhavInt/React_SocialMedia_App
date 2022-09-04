import express from "express";
import auth from "../middleware/auth.js";
import {
  createTour,
  getTour,
  getTourByUser,
  getTours,
} from "../controllers/tourControllers.js";
const tourRouter = express.Router();

tourRouter.post("/", auth, createTour);
tourRouter.get("/", getTours);
tourRouter.get("/:id", getTour);
tourRouter.get("/userTours/:id", auth, getTourByUser);

export default tourRouter;
