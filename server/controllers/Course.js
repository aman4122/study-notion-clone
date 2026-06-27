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
                populate: [
                    {
                        path: "courseContent",
                        populate: {
                            path: "subSection",
                        }
                    },
                    {
                        path: "ratingandReviews"
                    }
                ]
            })
            .populate("courseProgress")
            .exec();

        // Compute totalDuration dynamically if not already saved
        const coursesWithDuration = userDetails.courses.map(course => {
            const courseObj = course.toObject();
            if (!courseObj.totalDuration) {
                let totalSeconds = 0;
                if (courseObj.courseContent) {
                    courseObj.courseContent.forEach(sec => {
                        if (sec.subSection) {
                            sec.subSection.forEach(sub => {
                                if (sub.timeDuration) {
                                    const parts = sub.timeDuration.split(':').map(Number);
                                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) totalSeconds += parts[0] * 60 + parts[1];
                                    else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
                                }
                            });
                        }
                    });
                }
                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;
                if (totalSeconds > 0) {
                    courseObj.totalDuration = h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
                } else {
                    courseObj.totalDuration = "0m 0s";
                }
            }
            // Calculate progress
            let totalSubsections = 0;
            if (courseObj.courseContent) {
                courseObj.courseContent.forEach(sec => {
                    totalSubsections += sec?.subSection?.length || 0;
                });
            }

            const courseProgress = userDetails.courseProgress.find(progress => progress.courseID.toString() === courseObj._id.toString());
            const completedVideos = courseProgress?.completedVideos?.length || 0;
            
            courseObj.progressPercentage = totalSubsections === 0 ? 0 : Math.round((completedVideos / totalSubsections) * 100);

            return courseObj;
        });

        return res.status(200).json({
            success: true,
            data: coursesWithDuration,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;
        const instructorCourses = await Course.find({
            instructor: instructorId,
        })
        .populate({
            path: "courseContent",
            populate: { path: "subSection" }
        })
        .sort({ createdAt: -1 });

        const coursesWithDuration = instructorCourses.map(course => {
            const courseObj = course.toObject();
            if (!courseObj.totalDuration) {
                let totalSeconds = 0;
                if (courseObj.courseContent) {
                    courseObj.courseContent.forEach(sec => {
                        if (sec.subSection) {
                            sec.subSection.forEach(sub => {
                                if (sub.timeDuration) {
                                    const parts = sub.timeDuration.split(':').map(Number);
                                    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) totalSeconds += parts[0] * 60 + parts[1];
                                    else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
                                }
                            });
                        }
                    });
                }
                const h = Math.floor(totalSeconds / 3600);
                const m = Math.floor((totalSeconds % 3600) / 60);
                const s = totalSeconds % 60;
                if (totalSeconds > 0) {
                    courseObj.totalDuration = h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`;
                } else {
                    courseObj.totalDuration = "0m 0s";
                }
            }
            return courseObj;
        });

        res.status(200).json({
            success: true,
            data: coursesWithDuration,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        });
    }
}

exports.seedCourses = async (req, res) => {
    try {
        const Category = require('../models/Category');
        const User = require('../models/User');
        const Profile = require('../models/Profile');
        const Course = require('../models/Course');

        const categories = await Category.find({});
        if (categories.length === 0) {
            return res.status(400).json({ success: false, message: "No categories found." });
        }

        // Find or create an instructor
        let instructor = await User.findOne({ accountType: "Instructor" });
        if (!instructor) {
            const profile = await Profile.create({ about: "Dummy Instructor" });
            instructor = await User.create({
                firstName: "Dummy",
                lastName: "Instructor",
                email: "dummy@instructor.com",
                password: "password123",
                accountType: "Instructor",
                additionalDetails: profile._id,
                image: "https://api.dicebear.com/5.x/initials/svg?seed=Dummy%20Instructor",
                token: "dummy"
            });
        }

        let addedCourses = [];
        for (let cat of categories) {
            const courseName = `Mastering ${cat.name}`;
            const existingCourse = await Course.findOne({ courseName, category: cat._id });
            if (!existingCourse) {
                const newCourse = await Course.create({
                    courseName: courseName,
                    courseDescription: `A comprehensive course on ${cat.name} designed to take you from beginner to expert.`,
                    instructor: instructor._id,
                    whatYouWillLearn: `Everything about ${cat.name}.`,
                    price: Math.floor(Math.random() * 5000) + 1000,
                    thumbnail: `https://via.placeholder.com/800x400?text=${encodeURIComponent(cat.name)}`,
                    category: cat._id,
                    studentsEnrolled: []
                });

                // Add course to instructor
                await User.findByIdAndUpdate(instructor._id, { $push: { courses: newCourse._id } });
                // Add course to category
                await Category.findByIdAndUpdate(cat._id, { $push: { courses: newCourse._id } });

                addedCourses.push(newCourse.courseName);
            }
        }

        res.status(200).json({ success: true, message: "Courses seeded", addedCourses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error seeding courses", error: err.message });
    }
}

exports.fixDates = async (req, res) => {
    try {
        const Course = require('../models/Course');
        const courses = await Course.find({ createdAt: { $exists: false } });
        for (let course of courses) {
            course.createdAt = new Date();
            await course.save();
        }
        res.status(200).json({ success: true, message: `Fixed dates for ${courses.length} courses` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error fixing dates" });
    }
}

exports.publishCourse = async (req, res) => {
    try {
        const { courseId, manualDuration } = req.body;
        const Course = require('../models/Course');
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: { path: "subSection" }
        });

        if (!course) return res.status(404).json({ success: false, message: "Course not found" });

        let totalDuration = manualDuration;
        if (!totalDuration) {
            let totalSeconds = 0;
            if (course.courseContent) {
                course.courseContent.forEach(sec => {
                    if (sec.subSection) {
                        sec.subSection.forEach(sub => {
                            if (sub.timeDuration) {
                                const parts = sub.timeDuration.split(':').map(Number);
                                if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) totalSeconds += parts[0] * 60 + parts[1];
                                else if (parts.length === 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) totalSeconds += parts[0] * 3600 + parts[1] * 60 + parts[2];
                            }
                        });
                    }
                });
            }
            const h = Math.floor(totalSeconds / 3600);
            const m = Math.floor((totalSeconds % 3600) / 60);
            const s = Math.floor(totalSeconds % 60);
            totalDuration = h > 0 ? `${h}h ${m}m ${s}s` : m > 0 ? `${m}m ${s}s` : `${s}s`;
        }

        course.totalDuration = totalDuration;
        await course.save();

        res.status(200).json({ success: true, message: "Course published", totalDuration });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to publish course" });
    }
}