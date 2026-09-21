const {User} = require("../models");
const generateOTP = require("../utils/otpGenerate");
const { storeOTP } = require("../utils/otpStore");
const sendOTPEmail = require("../utils/sendEmail");

const forgotPassword = async (req, res) => {
    try {
        const  {email}  = req.body;

        console.log("Forgot password request received for email:", email);

        // 1. Check email
        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        // 2. Check user in database
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({
                message: "Email is not registered"
            });
        }

        // 3. Generate OTP
        const otp = generateOTP();

        // 4. Store OTP in Redis for 5 minutes
        await storeOTP(email, otp);

        // 5. Send OTP to user's email
        await sendOTPEmail(email, otp);

        return res.status(200).json({
            message: "OTP sent successfully"
        });

    } catch (error) {
        console.error("Forgot password error:", error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};

module.exports = 
    forgotPassword
;