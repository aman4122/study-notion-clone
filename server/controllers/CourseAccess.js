const Course = require("../models/Course");
const User = require("../models/User");

/**
 * POST /api/v1/course/getCoursePreview
 * Body: { courseId }
 *
 * Returns basic course info (name, description, thumbnail, price, instructor,
 * studentsEnrolled) WITHOUT courseContent / subSections.
 * Safe to show to any authenticated user — no paid content is leaked.
 */
exports.getCoursePreview = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const coursePreview = await Course.findById(courseId)
      .select("courseName courseDescription thumbnail price tag category instructor studentsEnrolled ratingandReviews createdAt")
      .populate("instructor", "firstName lastName image")
      .populate("category", "name description")
      .populate({
        path: "ratingandReviews",
        populate: {
          path: "user",
          select: "firstName lastName image",
        }
      })
      .exec();

    if (!coursePreview) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course preview fetched successfully!",
      data: coursePreview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Could not fetch course preview!",
    });
  }
};

/**
 * POST /api/v1/course/getCourseFullDetails
 * Body: { courseId }
 *
 * Returns FULL course details (including courseContent + subSections)
 * ONLY if the requesting user is enrolled in the course.
 */
exports.getCourseFullDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    // Check enrollment — the user must be in studentsEnrolled
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    const enrolled = course.studentsEnrolled.some(
      (sid) => sid.toString() === userId.toString()
    );

    if (!enrolled) {
      return res.status(403).json({
        success: false,
        message: "You are not enrolled in this course!",
      });
    }

    // Enrolled — return full details
    const fullCourse = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: { path: "additionalDetails" },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();
    const CourseProgress = require("../models/CourseProgress");
    const User = require("../models/User");
    const userDoc = await User.findById(userId).populate("courseProgress");
    const courseProgress = userDoc.courseProgress.find(progress => progress.courseID.toString() === courseId);

    return res.status(200).json({
      success: true,
      message: "Full course details fetched successfully!",
      data: {
        courseDetails: fullCourse,
        completedVideos: courseProgress ? courseProgress.completedVideos : [],
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Could not fetch course details!",
    });
  }
};
