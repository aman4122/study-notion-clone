//sendotp
// SENDVERIFICATIONEMAIL WALE MAIN JO OTP USKA LOGIC YAHA PE LIKHNA HAIIII

const User = require("../models/User");
const Profile = require("../models/Profile");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const otpGen = require("otp-generator");
const mailSender = require("../utils/mailSender")



exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const checkUserExists = await User.findOne({ email });
    //check USER ALREADY EXISTS

    //return RESPONSE For already existing user

    if (checkUserExists) {
      return res.status(401).json({
        success: false,
        message: "User already exists!!",
      });
    }
    //other case, that is ,Genrate OTP

    var otp = otpGen.generate(7, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("OTP generated:", otp);

    //ISS OTP KO GENERATE KRKE DB MEIN SAVE KRNA FOR FUTURE SO THAT TO CHECK WHETHER GENRATED OTP UNIQUE OR NOT

    //check uniqueness
    // const result = await OTP.findOne({ otp: otp });

    let result = await OTP.findOne({ otp });

    while (result) {
      otp = otpGen.generate(7, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }

    //code to save the generated otp in DataBase
    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);
    console.log(otpBody);
    //saved

    return res.status(200).json({
      success: true,
      message: "OTP sent!!",
      otp
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//signup
exports.signup = async (req, res) => {
  //data fetch from  request ki body
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contact,
      otp,
    } = req.body;

    //validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "All important field not filled!!",
      });
    }

    //check passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match!!",
      });
    }
    // const { email } = req.body;
    const existingUser = await User.findOne({ email });
    //check USER ALREADY EXISTS

    //return RESPONSE For already existing user

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists!!",
      });
    }

    //find most recent otp stored for user
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);

    if (!recentOtp) {
      return res.status(401).json({
        success: false,
        message: "OTP expired or not sent. Please request a new OTP!!",
      });
  
    } else if (String(recentOtp.otp) !== String(otp)) {

      return res.status(401).json({
        success: false,
        message: "OTP not correct!!",
      });
    }

    //Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //finally create an entry into the Database
  
    const profileDetails = await Profile.create({
      gender: null,
      birthDate: null,
      about: null,
      contact: contact || null,
    });

  
    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    //return a success response
    return res.status(200).json({
      success: true,
      message: "Entry created!!",
      user
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Entry could not be created!!",
    });
  }
};
//login
exports.login = async (req, res) => {
  try {
    //get data
    const { email, password } = req.body;

    //validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Fill all the fields!!",
      });
    }

    const user = await User.findOne({ email });
    // .populate("additionalDetails");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Could not find user with such email",
      });
    }

    //generate JWT,after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
        //generate some data filled payload
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // user.token = user;
      user.token = token;
      user.password = undefined; //YE KYU KIYA BHAI??? → Ans: DB mein change nahi hota, sirf response object se remove hota hai — password client ko leak na ho isliye
      //token generated now send cookie

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      //create cookie and send response
      res.cookie("token", token, options).status(200).json({
        success: true,
        token: token, //YE SAHI HAI KYA???? → Ans: Haan sahi hai — cookie httpOnly XSS ke liye, body mein token frontend SPA ke liye (localStorage/state)
        user,
        message: "Loogged In successfuly",
      });
    } else {
      console.log("Incorrect password!!");
      return res.status(400).json({
        success: false,
        message: "Incorrect Password",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error logging you in,please try again!!",
    });
  }
};

//change password

exports.changePassword = async (req, res) => {
  try {
    //data fetch krle
    const { password, confirmPassword, newPassword } = req.body;
    const userId = req.user.id;

   
    if (!password || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!!"
      });
    }

    //puran pasword puch le,naya password puch lle,confirm krle
    const user = await User.findById(userId)
    const isCorrectPassword = await bcrypt.compare(password, user.password)

    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "Old Password not correct"
      })
    }


    //validation
    if (newPassword !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Passwords do not match"
      })
    }
    //naya password set kar de in DB
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true })
    //send email - password updated!!
    // FIX 3: mailSender now called with all 3 required args (email, subject, body)
    await mailSender(
      user.email,
      "Password Changed Successfully!!",
      "<p>Your account password was changed successfully. If this wasn't you, contact support immediately.</p>"
    )

    //send response success
    return res.status(200).json({
      success: true,
      message: "Password Changed Successfully!!"
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Could not change password,please try again!!",
    });
  }
};