const express = require("express");
const router = express.Router();

const {
    createCourse,
    showAllCourses,
    getAllDetails,
} = require("../controllers/Course");
const {
    createCategory,
    showAllCategories
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
    deleteSection
} = require("../controllers/Section")



const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection")


router.post("/createCourse", auth, isInstructor, createCourse);

router.get("/getAllCourses", showAllCourses);

// router.post("/getAllDetails", auth, getAllDetails);






router.post("/createCategory", auth, isAdmin, createCategory)

router.get("/showAllCategories", auth, isAdmin, showAllCategories)





router.post("/addSection",auth,isInstructor,createSection)

router.post("/updateSection",auth,isAdmin,updateSection)

router.delete("/deleteSection",auth,isAdmin,deleteSection)




router.post("/getCourseDetails",auth,getAllDetails)




router.post("/addSubSection",auth,createSubSection)
router.post("/updateSubSection",auth,updateSubSection)
router.delete("/deleteSubSection",auth,isAdmin,deleteSubSection)


module.exports = router;