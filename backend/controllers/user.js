import User from "../models/user.js";
export const getUsers = async (req, res) => {
  const users = await User.find({});
  return res.status(200).json(users);
};
export const addUser = async (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  try {
    const user = await User.create({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      location: "error in addUser",
      message: error.message,
    });
  }
};
