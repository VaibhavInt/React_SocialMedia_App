import express from "express";
import { createTour, getTours } from "../controllers/tourControllers.js";
const tourRouter = express.Router();

tourRouter.post("/", createTour);
tourRouter.get("/", getTours);

export default tourRouter;
