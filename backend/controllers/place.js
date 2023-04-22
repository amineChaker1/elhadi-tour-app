import Place from "../models/place.js";

export const getAllPlaces = async (req, res) => {
  try {
    const place = await Place.find({});
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      location: error.location,
      message: error.message,
    });
  }
};

export const addNewPlace = async (req, res) => {
  const newPlace = req.body;
  try {
    const place = await Place.create(newPlace);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      location: error.location,
      message: error.message,
    });
  }
};
