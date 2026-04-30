// const { instance } = require("../config/razorpay")
// const Course = require('../models/Course')
// const User = require('../models/User')
// const mailSender = require("../utils/mailSender")
// const mongoose = require("mongoose")



// const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail")
// //ABHI NAHI BANAYA HAIIIIIIIII




// exports.capturePayment = async (req, res) => {
//     //fetch data
//     //validation
//     //validate courseid
//     //validate coursedetail
//     //user alrrady apllied course
//     //create order === FIRST MAJOR STEP
//     //RETURN RESPONSE
//     const { course_id } = req.body
//     const userId = req.user.id;
//     if (!userId) {
//         return res.status(403), json({
//             success: false
//         })
//     }
//     let course;
//     try {
//         course = await Course.findById(userId);
//         if (!course) {
//             return res.status(403), json({
//                 success: false
//             })
//         }

//         const uid = new mongoose.Types.ObjectId(userid);

//         if (course.studentsEnrolled(uid)) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Student already enrolled hai brother!!!"
//             })
//         }

//     }
//     catch (err) {
//         console.log(err)
//         return res.status(500), json({
//             success: false,

//         })
//     }

//     //order create 

//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//         amount: amount * 100,
//         currency: currency,
//         receipt: Math.random.now().tostring(),
//         //ye notes bass EXTRAAAA HAI ITNA JARURI NAHI HAI
//         notes: {
//             courseId: course_id,
//             userid,
//         }
//     }


//     //return response
//     //function calll
//     try {
//         const paymentResponse = await instance.order.create(options);
//         console.log(paymentResponse);
//         return res.status(200), json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnal: course.thumbnail,
//             orderId: paymentResponse.orderId,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//             message: "Order created successfully!!!"
//         })
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500), json({
//             success: false,
//             message: "Could not create an order , please try again!!!"
//         })
//     }
// }

// /// verify the signature

// exports.verifySignature = async (req, res) => {
//     ////matching karni hai basss ===== BASSS WAHI AUTHORIZATION HOTI HAI PAYMENT KI
//     //




//     //BAHUT HI saare synrax hai

//     const webHookSecret = "123456789";

//     const signature = req.headers["x-razorpay-signature"];



//     crypto.createHmac
//     //Hmac = hashed 

//     //SHA hashing method    
//     //{1}
//     const shasum = crypto.createHmac("sha256", webHookSecret);


//     //{2}
//     shasum.update(JSON.stringify(req.body));
//     //{3}
//     const digest = shasum.digest("hex");


//     if (signature === digest) {
//         console.log("Payment Authorised!!")


//         const { coursseId, userid } = req.body.payload.payment.entity.notes;
//         ///this syntax used ony because we cannot do testing here 

//         try {
//             //fufil action

//             //finsd course and and enrooll student in it
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true }
//             );
//             if (!enrolledCourse) {
//                 return res.status(403).json({
//                     success: false,
//                     message: "No such course found!!!"
//                 })
//             }

//             console.log(enrolledCourse)


//             //find user and enroll course in its array of courses

//             const enrolledStudent = await user.findOneAndUpdate(
//                 { _id: userid },
//                 {
//                     $push: { courses: courseId }
//                 },
//                 {
//                     new: true
//                 }
//             );



//             //student enrolled to course and course enrollled to student and now retur mail as response


//             //{1}send Mail
//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congrats",
//                 "Congratulations!!!"
//             )
//             //{2} return ressponse
//             console.log(emailResponse)
//             return res.status(200).json({
//                 success: true,
//                 messagge: "Enrolled successfully!!!"
//             })
//         }
//         catch (err) {
//             console.log(err);
//             return res.staus(500).json({
//                 success: false,
//                 messgae: "Signature not cerified,please try again!!"
//             })
//         }
//     }

// }


const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!userId) {
        return res.status(403).json({
            success: false,
            message: "User not found!!!",
        });
    }

    let course;
    try {
        course = await Course.findById(course_id);
        if (!course) {
            return res.status(403).json({
                success: false,
                message: "Course not found!!!",
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);

        if (course.studentsEnrolled.includes(uid)) {
            return res.status(401).json({
                success: false,
                message: "Student already enrolled!!!",
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error validating course!!!",
        });
    }

    const amount = course.price;
    const currency = "INR";
    const options = {
        amount: amount * 100,
        currency: currency,
        receipt: Math.random().toString(),
        notes: {
            courseId: course_id,
            userId,
        },
    };

    try {
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
            message: "Order created successfully!!!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not create an order, please try again!!!",
        });
    }
};

exports.verifySignature = async (req, res) => {
    const webHookSecret = "123456789";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webHookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment Authorised!!");

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(403).json({
                    success: false,
                    message: "No such course found!!!",
                });
            }

            console.log(enrolledCourse);

            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { new: true }
            );

            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congrats",
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
            );

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "Enrolled successfully!!!",
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Signature not verified, please try again!!!",
            });
        }
    } else {
        return res.status(403).json({
            success: false,
            message: "Invalid signature, unauthorised request!!!",
        });
    }
};