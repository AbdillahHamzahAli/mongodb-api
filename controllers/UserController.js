import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const saveUser = async (req, res) => {
  const { body, file } = req;
  const user = new User({
    name: body.name,
    email: body.email,
    gender: body.gender,
    image: file.path,
  });
  console.log(file.path);
  try {
    const insertUser = await user.save();
    res.status(201).json(insertUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(201).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
