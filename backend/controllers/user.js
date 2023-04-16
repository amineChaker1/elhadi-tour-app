import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};
export const addUser = async (req, res) => {
  const newUser = req.body;
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  try {
    const user = await User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      location: "error in addUser",
      message: error.message,
    });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) res.status(500).json("User not found");
    const passwordOK = await bcrypt.compare(password, user.password);
    if (!passwordOK) res.status(500).json("Password doesnt Match");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      location: "error in loginUser",
      message: error.message,
    });
  }
};
