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
export const getSinglePLace = async (req, res) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id);
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({
      location: error.location,
      message: error.message,
    });
  }
};
export const updatePlace = async (req, res) => {
  const { id } = req.params;
  const updatedHouse = req.body;
  console.log(updatedHouse);
  try {
    const place = await Place.findByIdAndUpdate(id, {
      title: updatedHouse.title,
      address: updatedHouse.address,
      photos: updatedHouse.photos,
      description: updatedHouse.description,
      perks: updatedHouse.perks,
      extraInfo: updatedHouse.extraInfo,
      checkIn: updatedHouse.checkIn,
      checkOut: updatedHouse.checkOut,
      maxGuests: updatedHouse.maxGuests,
    });
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
