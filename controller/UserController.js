import User from "../model/UserModel.js";

// Create User
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ status: "create user", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({status:"success",data:user});
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(204).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
