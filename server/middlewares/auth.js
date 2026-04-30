


const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User")



//auth   == verify json web token
exports.auth = async (req, res, next) => {
    try {
        //extract token
        // const token = req.body.token || req.header("Authorization").replace("Bearer ", "") || req.cookies.token;
        
        const token = req.body?.token || req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;


        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Missing Token!!"
            })
        }


        //verify token


        try {
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;//YE KYA HAI BHAUUUU  ,,, DECODE KO USER KI BODY ME DAAL DIYA ???????   
        }
        catch (err) {
            console.log(err)
            return res.status(403).json({
                success: false,
                message: "Something went wrong while validating the token!!!"
            })

        }
        next();
    }
    catch (err) {
        console.log(err)
        // FIX 1: res.status(err) -> res.status(500)
        // err is an Error object, not a status code
        return res.status(500).json({
            success: false,
            message: "Invalid token used!!"
        })
    }
}






//isStudent

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            // FIX 2: re.status -> res.status (typo)
            return res.status(401).json({
                success: false,
                message: "This route is only for students!!"
            })
        }
        // FIX 3: next() was never called when check passes
        // without this, valid students hit a permanently hanging request
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could Not verify Student account type!!"
        })
    }
}




//isInstructor



exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This route is only for Instructors!!"
            })
        }
        // FIX 3 (cont): next() missing for valid Instructors
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could Not verify Instructor account type!!"
        })
    }
}







//isAdmin



exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This route is only for Admins!!"
            })
        }
        // FIX 3 (cont): next() missing for valid Admins
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could Not verify Admin account type!!"
        })
    }
}