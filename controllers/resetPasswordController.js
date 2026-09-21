const { getOTP, deleteOTP } = require("../utils/otpStore");
const {User} = require("../models");
const bcrypt = require("bcrypt");

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body || {};

        if (!email || !otp || !newPassword) {
            return res.status(400).json({
                message: "Email, OTP and new password are required"
            });
        }

        // OTP verification and password update
        const storedOTP = await getOTP(email);

        console.log("Reset password request received for email:", storedOTP);

        // Check if the OTP is valid
        if (!storedOTP || storedOTP !== otp) {
            return res.status(400).json({
                message: "Invalid or expired OTP"
            });
        }

        // OTP is valid
        console.log("OTP verified successfully");


        // delete from redis after successful verification
        await deleteOTP(email);

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        

        // Save the updated password to the database
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });
       

    } catch (error) {
        console.error("Reset password error:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = {
    resetPassword
};