const express = require("express");
const router = express.Router();

const { updateProfile, deleteProfile ,updateDisplayPicture , getAllUserDetails} = require("../controllers/Profile");
const { auth, isStudent } = require("../middlewares/auth");

router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth,isStudent, deleteProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/getUserDetails", auth, getAllUserDetails);

const { updateEmail } = require("../controllers/UpdateEmail");
router.put("/updateEmail", auth, updateEmail);

module.exports = router;


