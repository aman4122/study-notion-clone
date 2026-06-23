const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");


//initialize the razorpay order
exports.capturePayment = async (req, res) => {

    const { courses } = req.body;
    const userId = req.user.id;


    //validation 
    if (courses.length === 0) {

        return res.json({
            success: false,
            message: 'provide course id!!'
        })
    }


    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(403).json({
                    success: false,
                    message: "Could not find the course!!"
                })
            }
            const uid = new mongoose.Types.ObjectId(userId);

            if (course.studentsEnrolled.includes(uid)) {
                return res.status(404).json({
                    success: false,
                    message: "Student already enrolled in the given course!!"
                });
            }
            totalAmount += course.price;
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }
    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: true,
            message: "Could not initiate Order"
        })
    }


}


//verify payment
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    //// TO KNOW WHY ALLL THESE ARE IMPORTED HERE , USE RAZORPAY WEBSITE razorpay/docs/payments page


    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed"
        });
    }
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");


    if (expectedSignature === razorpay_signature) {
        //enroll karo student ko
        await enrollStudents(courses, userId, res);
        //return response

        return res.status(200).json({
            success: true,
            message: "Payment success!!"
        })

    }
    return res.status(401).json({
        success: false,
        message: "You failed in your payments!!!!"
    })
}


const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide data atleast.. of the user and the course... both"
        })
    }


    for (const courseId of courses) {

        try {

            const enrolledCourses = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            )

            if (!enrolledCourses) {
                return res.status(500).json({
                    success: false, message: "Course not found"
                });
            }

            //find student and add course to their list of enrolledCourses

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                    }
                }
                ,
                { new: true })

            //to send mail

            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourses.courseName}`,
                courseEnrollmentEmail(enrolledCourses.courseName, `${enrolledStudent.firstName}`)
            )
            console.log("Email sent successfully", emailResponse.response);
        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                success:false,
                message:`Could not enroll student , ${err.message}`
            })
        }
    }

}





exports.sendPaymentSuccessEmail =async(req,res)=>{
    const {orderId,paymentId,
    amount} = req.body;

    const userId=req.user.id;

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({success:false, message:"Please provide all details!!!"});
    }


    try{
        //find studnet 
        const enrolledStudent = await User.findById(userId);
        const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");

        await mailSender(
            enrolledStudent.email,
            `Paymnet received`,
            this.PaymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount/100,orderId,paymentId
            )
        )
    }
    catch(err){
        console.log("Error in sending mail",err);
        return res.status(500).json({success:false,message:"Could not send mail."})
    }
}



// exports.capturePayment = async (req, res) => {
//     const { course_id } = req.body;
//     const userId = req.user.id;

//     if (!userId) {
//         return res.status(403).json({
//             success: false,
//             message: "User not found!!!",
//         });
//     }

//     let course;
//     try {
//         course = await Course.findById(course_id);
//         if (!course) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Course not found!!!",
//             });
//         }

//         const uid = new mongoose.Types.ObjectId(userId);

//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Student already enrolled!!!",
//             });
//         }
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Error validating course!!!",
//         });
//     }

//     const amount = course.price;
//     const currency = "INR";
//     const options = {
//         amount: amount * 100,
//         currency: currency,
//         receipt: Math.random().toString(),
//         notes: {
//             courseId: course_id,
//             userId,
//         },
//     };

//     try {
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         return res.status(200).json({
//             success: true,
//             courseName: course.courseName,
//             courseDescription: course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency: paymentResponse.currency,
//             amount: paymentResponse.amount,
//             message: "Order created successfully!!!",
//         });
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Could not create an order, please try again!!!",
//         });
//     }
// };

// exports.verifySignature = async (req, res) => {
//     const webHookSecret = "123456789";
//     const signature = req.headers["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment Authorised!!");

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {
//             const enrolledCourse = await Course.findOneAndUpdate(
//                 { _id: courseId },
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true }
//             );

//             if (!enrolledCourse) {
//                 return res.status(403).json({
//                     success: false,
//                     message: "No such course found!!!",
//                 });
//             }

//             console.log(enrolledCourse);

//             const enrolledStudent = await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $push: { courses: courseId } },
//                 { new: true }
//             );

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congrats",
//                 courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName)
//             );

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Enrolled successfully!!!",
//             });
//         } catch (err) {
//             console.log(err);
//             return res.status(500).json({
//                 success: false,
//                 message: "Signature not verified, please try again!!!",
//             });
//         }
//     } else {
//         return res.status(403).json({
//             success: false,
//             message: "Invalid signature, unauthorised request!!!",
//         });
//     }
// };