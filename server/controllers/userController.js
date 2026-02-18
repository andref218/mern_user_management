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
