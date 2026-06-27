const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getAllDetails,
} = require("../controllers/Course");
const {
    createCategory,
    showAllCategories,
        getCategoryPageDetails,
        seedCategories,
} = require("../controllers/Categories")
const {
    auth,
    isInstructor,
    isStudent,
    isAdmin,
} = require("../middlewares/auth");


const {
    createSection,
    updateSection,
    deleteSection,
    updateSectionOrder
} = require("../controllers/Section")



const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection")

const { getEnrolledCourses } = require("../controllers/Course")




router.post("/createCourse", auth, isInstructor, createCourse);

router.get("/getAllCourses", showAllCourses);

// router.post("/getAllDetails", auth, getAllDetails);






router.post("/createCategory", auth, isAdmin, createCategory)

// router.get("/showAllCategories", auth, isAdmin, showAllCategories)
router.get("/showAllCategories",  showAllCategories)
router.get("/seedCategories", seedCategories)



router.post("/addSection",auth,isInstructor,createSection)

router.post("/updateSection",auth,isAdmin,updateSection)

router.delete("/deleteSection",auth,isAdmin,deleteSection)

router.post("/updateSectionOrder", auth, isInstructor, updateSectionOrder)

router.post("/getCategoryPageDetails", getCategoryPageDetails)


router.post("/getCourseDetails",auth,getAllDetails)




router.post("/addSubSection",auth,createSubSection)
router.post("/updateSubSection",auth,updateSubSection)
router.delete("/deleteSubSection",auth,isAdmin,deleteSubSection)



router.get("/getEnrolledCourses", auth, getEnrolledCourses)    


const { getCoursePreview, getCourseFullDetails } = require("../controllers/CourseAccess");
router.post("/getCoursePreview", auth, getCoursePreview);
router.post("/getCourseFullDetails", auth, getCourseFullDetails);

const { updateCourseProgress } = require("../controllers/courseProgress");
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

const { getInstructorCourses, seedCourses, fixDates, publishCourse } = require("../controllers/Course");
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.get("/seedCourses", seedCourses);
router.get("/fixDates", fixDates);
router.post("/publishCourse", auth, isInstructor, publishCourse);

// INSTRUCTOR SPECIFIC ROUTES FOR EDITING
router.post("/instructor/updateSection", auth, isInstructor, updateSection);
router.post("/instructor/deleteSection", auth, isInstructor, deleteSection); // Changed to post for ease or keep delete? wait, I'll use post to match deleteSection controller handling if needed, or keep delete. Controller uses req.body or req.params? Let's check `deleteSection` in `server/controllers/Section.js`. It uses `req.body.sectionId` usually. Express `delete` with body works but `post` is safer. Let's just use `post`.
router.post("/instructor/deleteSubSection", auth, isInstructor, deleteSubSection);

// RATING AND REVIEW ROUTES
const { createRating, editRating, getAverageRating, getAllRatingsReviews } = require("../controllers/RatingAndReview");
router.post("/createRating", auth, isStudent, createRating);
router.post("/editRating", auth, isStudent, editRating);
router.post("/getAverageRating", getAverageRating);
router.get("/getAllRatingsReviews", getAllRatingsReviews);

module.exports = router;