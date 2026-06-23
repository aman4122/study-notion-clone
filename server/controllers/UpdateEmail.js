const User = require("../models/User");

// PUT /api/v1/profile/updateEmail
// Updates the user's email address
exports.updateEmail = async (req, res) => {
  try {
    const userId = req.user.id;
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required!",
      });
    }

    // Check if another user already has this email
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(409).json({
        success: false,
        message: "This email is already in use by another account!",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email },
      { new: true }
    ).populate("additionalDetails");

    updatedUser.password = undefined;

    return res.status(200).json({
      success: true,
      message: "Email updated successfully!",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Could not update email, please try again!",
    });
  }
};
