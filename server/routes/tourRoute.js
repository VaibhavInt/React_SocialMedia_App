import express from "express";
import auth from "../middleware/auth.js";
import {
  createTour,
  deleteTour,
  getTour,
  getTourByUser,
  getTours,
  getToursBySearch,
  getToursByTag,
  updateTour,
} from "../controllers/tourControllers.js";
const tourRouter = express.Router();

tourRouter.get("/search", getToursBySearch);
tourRouter.get("/tag/:tag", getToursByTag);
tourRouter.get("/", getTours);
tourRouter.get("/:id", getTour);

tourRouter.post("/", auth, createTour);
tourRouter.delete("/:id", auth, deleteTour);
tourRouter.patch("/:id", auth, updateTour);
tourRouter.get("/userTours/:id", auth, getTourByUser);

export default tourRouter;
