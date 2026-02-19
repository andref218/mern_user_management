const User = require("../models/userModel");

//Get status
exports.getStatus = async (req, res) => {
  try {
    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: "Active" });
    const inactive = await User.countDocuments({ status: "Inactive" });

    res.json({ total, active, inactive });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetch statistics", error: error.message });
  }
};

//Search Users
exports.searchUsers = async (req, res) => {
  try {
    const query = req.params.query;
    const page = parseInt(req.query.page) || 1;
    // Number of users per page (default: 10)
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // MongoDB search query:
    // Match users where any of these fields contains the search term
    const searchQuery = {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { phone: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    // Fetch users from database with sorting and pagination
    const users = await User.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(searchQuery);

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetch statistics", error: error.message });
  }
};

//Get all Users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    // Number of users per page (default: 10)
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch users from database with sorting and pagination
    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting all users", error: error.message });
  }
};

//Get Single User
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

//Create User
exports.createUser = async (req, res) => {
  try {
    // Destructure the user data from the request body
    const { name, email, phone, status } = req.body;
    if (!name || !email || !phone)
      return res
        .status(400)
        .json({ message: "Name, email and phone are required" });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: "Email already exist" });

    const user = new User({
      name,
      email,
      phone,
      status: status || "Active",
    });

    await user.save();
    res.status(201).json({ user, message: "User successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

//Update User
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    if (email) {
      const exists = await User.find({ email, _id: { $ne: req.params.id } });
      if (exists.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        phone,
        status,
      },
      { new: true, runValidators: true },
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user, message: "User successfully updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

//Delete user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User successfully deleted", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
