


const crypto = require("crypto")
const bcrypt = require("bcrypt")

const User = require("../models/User")
const mailSender = require("../utils/mailSender")


//resetPassword token
exports.resetPasswordToken = async (req, res,) => {

    try {

        ///get email from req body
        const email = req.body.email;


        //check user for such email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Email not found!!!"
            })
        }


        //generate token

        const token = crypto.randomUUID();



        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email: email }, {
            token: token,
            resetPasswordExpires: Date.now() + 5 * 60 * 1000
        }, { new: true });


        //create url

        const url = `https://localhost:3000/update-password/${token}`

        //send email containing url
        // was: mailSender(email, `Password Reset Link", "Password Rest Link:${url}`)
        await mailSender(
            email,
            "Password Reset Link",
            `Password Reset Link: ${url}`
        )


        //return response

        return res.status(200).json({
            success: true,
            message: "Reset Link sent successfully!!"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not reset password!!"
        });
    }

}


//reset Password


exports.resetPassword = async (req, res, next) => {
    try {
        //data fetch
        const { password, confirmPassword, token } = req.body;
        //QUESTION YE HAI KI BODY MEIN TOKEN KAHA SE AAYA >>>>>  FRONTEND NE LAYA HAI >>>>>BACKEND KA KAAM NHI HAI

        //validation

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords not matching!!!"
            });
        }

        //TOKEN ======>>>>> USED TO FIND USER ENTRY

        //get user details from database using token
        // FIX 5: user.findOne -> User.findOne (capital U)
        const userDetails = await User.findOne({ token: token });

        //if no entry - invalid token
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "No user details found!!"
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Reset Password Link Expired ,please try again!!"
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update the password

        // -> use userDetails.email fetched from DB via token
        await User.findOneAndUpdate(
            { email: userDetails.email },
            { password: hashedPassword },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password reset successfully!!!"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal server error,please try again!!"
        })
    }
}