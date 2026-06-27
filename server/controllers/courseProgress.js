const mongoose = require("mongoose");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId);
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" });
    }

    // Find the course progress document for the user and course
    // Wait, the CourseProgress model might not have userId? Let's check the schema.
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      // userId is not in CourseProgress model directly! It is referenced from User model's courseProgress array.
      // So how do we find the specific progress for a user?
      // A User has a courseProgress array of ObjectIds pointing to CourseProgress documents.
    });

    // We need to fetch User and their courseProgress to find the right one.
    const User = require("../models/User");
    const user = await User.findById(userId).populate("courseProgress");
    
    // Find the progress doc for this course
    courseProgress = user.courseProgress.find(progress => progress?.courseID?.toString() === courseId);
    
    let progressDoc;
    if (!courseProgress) {
        // Create it dynamically if it doesn't exist
        progressDoc = new CourseProgress({
            courseID: courseId,
            completedVideos: [subsectionId],
        });
        await progressDoc.save();
        
        // Add to user's courseProgress array
        user.courseProgress.push(progressDoc._id);
        await user.save();
        return res.status(200).json({ success: true, message: "Course progress created and updated" });
    } else {
        // Now update the existing document
        progressDoc = await CourseProgress.findById(courseProgress._id);
        
        if (progressDoc.completedVideos.includes(subsectionId)) {
          return res.status(400).json({ success: false, error: "Subsection already completed" });
        }
    
        progressDoc.completedVideos.push(subsectionId);
        await progressDoc.save();
    
        return res.status(200).json({ success: true, message: "Course progress updated" });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
