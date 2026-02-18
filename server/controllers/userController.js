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
