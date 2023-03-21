import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
  propertyOwner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    min: 8,
  },
  type: {
    type: String,
    enum: ["beach", "mountain", "village", "city"],
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  beds: {
    type: Number,
    required: true,
    min: 2,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
