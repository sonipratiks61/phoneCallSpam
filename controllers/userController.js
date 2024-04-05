const { User } = require('../models');

const userController = {
  getProfile: async (req, res) => {
    try {
        const user = req.query; 
        console.log(user,"user :")
        // console.log(req,"req :")
        const userProfile = await User.findOne({ phoneNumber: user.phoneNumber });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        userProfile.password = undefined;
        // Return the user profile
        return res.status(200).json(userProfile);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
};

module.exports = userController;
