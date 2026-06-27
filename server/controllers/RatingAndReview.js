const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
const mongoose = require("mongoose");


//createRating
exports.createRating = async (req, res) => {
    try {
        //get user id
        const userId = req.user.id;
        //fetch data
        const { rating, review, courseId } = req.body;
        //check user enrolled or npt 



        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } },
                //This is a query filter (not aggregation), used in something like Course.find(...).
                // $elemMatch   ====   traverse aray
                // $eq ====   checks of equal element
            });


        if (!courseDetails) {
            return res.status(403).json({
                success: false,
                message: "Could not find any student enrolled on given course!!!"
            });
        }
        //validation
        //check user already reviewd or not
        // FIX 3: findOne(userId) doesn't check by user+course combo
        // -> findOne({ user: userId, course: courseId })
        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });

        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Course already rated and reviewed by user!!!"
            })
        }
        //create rating and review
        //MAIN ACTIONNNNNNNNNNNNNNN
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            // FIX 4: UserId -> userId (wrong casing, was undefined)
            user: userId
        })
        //Just above an id is gnerated while making an entry ,  so i t is the one being pushed into the object  of Course
        //update course with this rating and review
        // FIX 5: CourseId -> courseId (wrong casing, was undefined)
        const updatedCourseDetails = await Course.findByIdAndUpdate({ _id: courseId },
            {
                $push: {
                    ratingandReviews: ratingReview._id     //FFIRR SEEE DEKH LENAAAA EK BBBBAARRR
                },
            },
            { new: true }
        )
        console.log(updatedCourseDetails)
        // return response
        return res.status(200).json({
            success: true,
            message: "Reviewed successfully!!",
            ratingReview
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failure,please try again!!!"
        })
    }
}
//editRating
exports.editRating = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (!alreadyReviewed) {
            return res.status(404).json({
                success: false,
                message: "Review not found for this user and course!!!"
            });
        }

        // update rating and review
        alreadyReviewed.rating = rating;
        alreadyReviewed.review = review;
        await alreadyReviewed.save();

        return res.status(200).json({
            success: true,
            message: "Review updated successfully!!",
            ratingReview: alreadyReviewed
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failure, please try again!!!"
        });
    }
}

// FIX 6: missing async keyword — function uses await inside
exports.getAverageRating = async (req, res) => {
    try {
        //get course Id
        // FIX 7: variable was named userId but holds courseId
        const courseId = req.body.courseId;
        //calculate aavg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {

                    _id: null,
                    avgRating: { $avg: "$rating" }


                }
            }
        ])

        // $match  →  sahi reviews chuno
        // $group  →  unka average nikalo


        // aggregate returns an array of average ratings done aon a course with given course id , also the value of result is such like that
        // ..return rating
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                // FIX 8: result[0].averageRating -> result[0].avgRating (matches $group field name)
                averageRating: result[0].avgRating,
            })
        }

        // FIX 9 (was missing): fallback when no ratings exist
        return res.status(200).json({
            success: true,
            averageRating: 0,
            message: "No ratings found for this course"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Could not find average,please try again!!!"
        })
    }
}



//get all ratings and reviews ...... jo banaya hai wo sab dikhaye kaise wo wala function




exports.getAllRatingsReviews = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find({})
            // FIX 11: "desc" -> -1 (correct Mongoose sort syntax)
            .sort({ rating: -1 })
            .populate({
                // FIX 10: "User" -> "user" (lowercase, must match schema field name)
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        // // Simple — no extra options needed
        // .populate("instructor")

        // Complex — need to select fields, add conditions, nested populate etc.
        // .populate({
        // path: "instructor",     // which field
        // select: "name email",   // which fields to return
        // model: "User",          // which model to use
        // })




        return res.status(200).json({
            success: true,
            // FIX 12: allReviews was fetched but never returned in response data
            data: allReviews,
            message: "Ratings and reviews fetched successfully!!!"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Could not find review and ratings for given course,please try again!!!"
        })
    }

}