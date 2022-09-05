import express from "express";
import auth from "../middleware/auth.js";
import {
  createTour,
  deleteTour,
  getTour,
  getTourByUser,
  getTours,
  updateTour,
} from "../controllers/tourControllers.js";
const tourRouter = express.Router();

tourRouter.post("/", auth, createTour);
tourRouter.get("/", getTours);
tourRouter.get("/:id", getTour);
tourRouter.delete("/:id", auth, deleteTour);
tourRouter.patch("/:id", auth, updateTour);
tourRouter.get("/userTours/:id", auth, getTourByUser);

export default tourRouter;
