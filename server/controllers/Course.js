const Course = require("../models/Course")

const Tag = require('../models/tags')
const Category = require('../models/category')

const User = require("../models/User")

const { uploadImageToCloudinary } = require("../utils/imageUploader");
const RatingsAndReview = require("../models/RatingAndReview");

//create course handler

exports.createCourse = async (req, res) => {
    //fetch data
    //file fetch
    //apply validation
    //instructor extra validation ?? EXTRAAA WHY??
    //check tags (validation)  ??
    //upload file to cloudinary
    //list of courses according to user in userschema == (1)"Bought" corses by student
    //(2)"Created" courses by Instructor



    try {
        //find id thorough decode payload from request
        //id we need to know account type



        //data fetch
        const { courseName, courseDescription, whatYouWillLearn, price, tag , category} = req.body;

        //thumbnail fetch
        const thumbnail = req.files.thumbnail;

        //validation
        if (!courseName || !courseDescription || !price || !tag || !thumbnail) {
            return res.status(401).json({
                success: false,
                message: "All fields required!!"
            })
        }

        //check for instructor

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details:", instructorDetails);

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found!!!"
            })
        }



        //check given tag is valid or not
        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Course Details not found!!!"
            })
        }



        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);


        //create an entry for new Course

        // FIX 2: whatYouWillLearn was destructured but never passed to Course.create()
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            category: categoryDetails._id,
            whatYouWillLearn,
            instructor: instructorDetails._id,
            price,
            tag,
            thumbnail: thumbnailImage.secure_url,

        })



        //add the new course to user schema
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },  //ISS ENTRY MEIN CHANGES KARNE WALE IE NEW COURSE ADD KARENGE IN COURSE ARRAY
            {
                $push: {
                    courses: newCourse._id,

                }
            },
            { new: true },
        );


        //UPDATE Category SCHEMA HOMEWORKK

        await Category.findByIdAndUpdate({
            _id: categoryDetails._id
        },
            {
                $push: {
                    course: newCourse._id,
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Course created successfully!!!",
            data: newCourse,
        });
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            // FIX 3: Typo "createw" -> "create"
            message: "Failed to create course!!!",
            error: err.message
        })


    }
}




exports.showAllCourses = async (req, res) => {
    try {


        //SOMETHING BIG BABYYYYYYYYYYYYYYYYY
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingandReviews: true,
            studentsEnrolled: true,
        })
            .populate("instructor")
            .exec();


        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully!!",
            data: allCourses,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to show all courses!!!",
            error: err.message
        })

    }
}





exports.getAllDetails = async (req, res) => {
   try{ 
    const { courseId } = req.body;
    const userId = req.user.id;


    if (!userId || !courseId) {
        return res.status(403).json({
            success: false,
            message: "No such user found",
        })
    }



    // const getCourseDetails = await Course.findById(courseId);


    // const getCourseDetails = await Course.findById(courseId).populate(
    //     [
    //         "instructor",
    //         // "ratingsandReview",
    //         // "tag",
    //         {
    //             path: "courseContent",
    //             populate: {
    //                 path: "subSection",
    //             },
    //         }])
    //     .exec();




    // FIX 4: Course.find() returns an array so if(!courseDetails) is always false
    // even when the course doesn't exist — switched to findById() which returns null when not found
    const courseDetails = await Course.findById(courseId)
        .populate(
            {
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
        .populate("category")
        .populate("instructor")
        // .populate("ratingsandReview")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            },

        })
        .exec();


        // validation
        if(!courseDetails){
            return res.status(403).json({
                success:false,
                message:"Could not find such course!!",
                data:courseDetails,
            })
        }

        //return response
        return res.status(200).json({
                success:true,
                message:"Course details fetched successfully!!",
                data:courseDetails,
            })
}
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Sorry,could not fetch course details,please try again!!!"
            })
        }

}




exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findById(userId)
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                }
            })
            .exec();

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}