import mongoose from "mongoose";
import TourModal from "../models/Tour.js";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new TourModal({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// before Pagginationn
// export const getTours = async (req, res) => {
//   try {
//     const tours = await TourModal.find();
//     res.status(200).json(tours);
//   } catch (error) {
//     res.status(404).json({ message: "Something went wrong" });
//     console.log(error);
//   }
// };

export const getTours = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TourModal.countDocuments({});
    const tours = await TourModal.find().limit(limit).skip(startIndex);
    res.json({
      data: tours,
      currentPage: Number(page),
      totalTours: total,
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await TourModal.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getTourByUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    const userTours = await TourModal.find({ creator: id });
    res.status(200).json(userTours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }
    await TourModal.findByIdAndRemove(id);
    res.json({ message: "Tour Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `No tour exist with id: ${id}` });
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await TourModal.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getToursBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await TourModal.find({ title });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getToursByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const tours = await TourModal.find({ tags: { $in: tag } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};

export const getRelatedTours = async (req, res) => {
  const tags = req.body;
  try {
    const tours = await TourModal.find({ tags: { $in: tags } });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(error);
  }
};
