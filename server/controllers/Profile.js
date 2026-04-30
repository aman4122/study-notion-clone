



const Profile = require("../models/Profile") 
const User = require("../models/User")

const Course = require("../models/Course")

const { uploadImageToCloudinary } = require("../utils/imageUploader");

const {isStudent}= require("../middlewares/auth")

exports.updateProfile = async (req, res) => {
    try {
        ///get data
        const { birthDate = "", about = "", contact, gender } = req.body;

        //get userId
        const id = req.user.id;

        //validation
        if (!id || !contact || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!!",
            })
        }

        //find profile == profile id not present but user id present ,fetch prof id from user id
        const userDetails = await User.findById(id);
        // correct logic: get profileId from userDetails.additionalDetails
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);


        //update profile
        profileDetails.birthDate = birthDate;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contact = contact;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success: true,
            message: "Profile Updated successfully!!",
            profileDetails
        });



    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not update your profile,please try again!!",
        })
    }
}



exports.deleteProfile = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(403).json({
                success: false,
                message: "No such profile/id found!!",
            })
        }


        //check kar ki student hi hai na , instructor and admin delete nhi ho skte
         if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Only students' profile can be deleted",
            });
        }

        //abb delete kar de profile
        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });


        // TODO::::HOMEWORK JO DLETE ho raha HAI USKO USKO UNENEROLL BHI KAR DE FROM ALL ENROLLED COURSES
        const unenrollFromAllCourses = async (userId, courseIds = []) => {
            if (!courseIds.length) return;

            await Course.updateMany(
                { _id: { $in: courseIds } },
                { $pull: { studentsEnrolled: userId } }
            );
        };

        await unenrollFromAllCourses(id, userDetails.courses);

        //and abb delete kar de user bhi 
        await User.findByIdAndDelete({ _id: id });

        //return response
        return res.status(200).json({
            success: true,
            message: "Your profile deleted successfully!!",
        });
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not delete your profile,please try again!!",
        })
    }
}

//Get All user details pehele id fetch aur fir additional details ko polpulate kar de + exec



//HOMEWORK :::: 1.SCHEDULING JOBS FOR LATER
//2. CRON JOB KE BAARE MEIN JAANKARI HHAASIL KAREIN



exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("FILES:", req.files);
        const image = req.files.displayPicture;
        const userId = req.user.id;

        // Cloudinary pe upload kar
        const uploadedImage = await uploadImageToCloudinary(
            image,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        // DB mein update kar
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { image: uploadedImage.secure_url },
            { new: true }
        );
        updatedUser.password = undefined;

        return res.status(200).json({
            success: true,
            message: "Display picture updated!!",
            data: updatedUser,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not update display picture!!",
        });
    }
};






exports.getAllUserDetails = async (req, res) => {
    try {
        // Auth middleware se userId lo
        const id = req.user.id;

        // User fetch karo aur additionalDetails (Profile) ko populate karo
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found!!",
            });
        }

        // Password hide karo response mein
        userDetails.password = undefined;

        return res.status(200).json({
            success: true,
            message: "User details fetched successfully!!",
            data: userDetails,
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not fetch user details, please try again!!",
        });
    }
};