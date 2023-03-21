import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, password, username, profileImg } = req.body;
  try {
    if (!email || !password) {
      throw Error("all fields must be filled");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImg,
    });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14 days",
    });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({
      location: error.location,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw Error("email doesnt exist");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "14 days",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({
      location: error.location,
      message: error.message,
    });
  }
};
