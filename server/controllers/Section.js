// const Section = require("../models/Section")

// const Course = require("../models/Course")


// exports.createSection = async (req, res) => {
//     try {
//         //data fetch
//         const { sectionName, courseId } = req.body;

//         //data validdation 
//         if (!sectionName || !courseId) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Properties missing!!!"
//             })
//         }
//         //create  Section

//         const newSection = await new Section.create({ sectionName })
//         //update course  === > Push into  course object
//         const updatedCourse = await Course.findByIdAndUpdate(
//             courseId,
//             {
//                 $push: {
//                     courseContent: newSection._id
//                 }
//             },
//             { new: true }//populate abhi bhi chahiye

//         )
//         return res.status(200).json({
//             success: true,
//             message: "New Section created successfully!!",
//             updatedCourse
//         })
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: "Could not create new Section,please try again!!"
//         })
//     }
// }



// exports.updateSection = async (req, res) => {
//     try {

//         //data input fetch krle bhai


//         const { sectionName, sectionId } = req.body;

//         //data validation
//         if (!sectionId || !sectionName) {
//             console.log(err);
//             return res.status(403).json({
//                 success: false,
//                 message: "Could not find such entry!!"
//             })
//         }
//         //after that update 

//         const section = await Section.findByIdAndUpdate(
//             sectionId,
//             { sectionName },
//             { new: true },

//         )
//         //return res
//         return res.status(200).json({
//             success: true,
//             message: "Section updated successfully!!",
//             updatedCourse
//         })

//     }
//     catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: "Could not update entry entry!!"
//         })
//     }
// }


// exports.deleteSection = async (req, res) => {
//     try {
//         const { sectionId } = req.body;

//         if (!sectionId) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Could not find such entry!!"
//             })

//         }


//         await Section.findOneAndDelete(sectionId);

//         //TODO:::: DELETE ALSO IN COURSE SCHEMA!!??

//         return res.status(200).json({
//             success: true,
//             message: "Section deleted successfully!!",

//         })
//     }

//     catch (err) {
//         return res.status(500).json({
//             success: false,
//             message: "Could not delete entry,please try again!!"
//         })
//     }
// }






const Section = require("../models/Section")

const Course = require("../models/Course")


exports.createSection = async (req, res) => {
    try {
        //data fetch
        const { sectionName, courseId } = req.body;

        //data validdation 
        if (!sectionName || !courseId) {
            return res.status(404).json({
                success: false,
                message: "Properties missing!!!"
            })
        }
        //create  Section

        // FIX 1: "await new Section.create()" is invalid — new and .create() can't be used together
        const newSection = await Section.create({ sectionName })
        //update course  === > Push into  course object
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id
                }
            },
            { new: true }//populate abhi bhi chahiye

        )
        return res.status(200).json({
            success: true,
            message: "New Section created successfully!!",
            updatedCourse
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could not create new Section,please try again!!"
        })
    }
}



exports.updateSection = async (req, res) => {
    try {

        //data input fetch krle bhai


        const { sectionName, sectionId } = req.body;

        //data validation
        if (!sectionId || !sectionName) {
            // FIX 2: console.log(err) removed — err is not in scope here, only exists in catch block
            return res.status(403).json({
                success: false,
                message: "Could not find such entry!!"
            })
        }
        //after that update 

        const section = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true },

        )
        //return res
        return res.status(200).json({
            success: true,
            message: "Section updated successfully!!",
            // FIX 3: updatedCourse was never defined in this function -> should be section
            data: section
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not update entry entry!!"
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId) {
            return res.status(403).json({
                success: false,
                message: "Could not find such entry!!"
            })

        }

        // FIX 4: findOneAndDelete(sectionId) takes a filter object not raw ID
        // -> switched to findByIdAndDelete(sectionId)
        await Section.findByIdAndDelete(sectionId);

        // FIX 5: TODO implemented — remove sectionId from Course.courseContent on deletion
        await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId
                }
            },
            { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully!!",

        })
    }

    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not delete entry,please try again!!"
        })
    }
}