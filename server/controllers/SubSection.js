// const subSection = require("../models/SubSection")
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const SubSection = require("../models/SubSection");

// //create subSection

// exports.createSubSection = async(req,res)=>{
//     try{
//         const {sectionId,title,timeDuration,description,videoUrl}= req.body;
//         //data fetched

//         const video =req.files.videoFile;
//         //video file fetched


//         if(!sectionId || !title || !timeDuration || !videoUrl || !description){
//             return res.status(404).json({
//                 success:false,
//                 message:"All fields required!!!"
//             })
//         }
//         //validated the data 



//         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
//         //uploading video nowww


//         const subSectionDetails=await subSection.create({
//             title:title,
//             description:description,
//             timeDuration:timeDuration,
//             videoUrl:uploadDetails.secure_url,
//         })
//         //complete subsection created


//         const updatedsection = await Section.findByIdAndUpdate(
//             {_id:sectionId},
//             {$push:{
//                 subSection:subSectionDetails
//             }},
//             {new:true},


//             // HW: USE POPULATE HERE TO GET FULL DATA 
//         );



//         return res.status(200).json({
//             success:true,
//             message:"Sub Section createed successfully!!",
//             updatedSection,
//         });
//         //response returned
//     }
//     catch(err){
//         return res.status(500).json({
//                 success:false,
//                 message:"SubSection could not be created!!!"
//             })
//     }
// }




// // HW::: UPDATE SubSection





// // HW::: DELETE SUBSECTION










// // FIX 1: Removed duplicate lowercase import of subSection
// // SubSection (capital) is the correct one, imported below
// const Section = require("../models/Section");
// const { uploadImageToCloudinary } = require("../utils/imageUploader");
// const SubSection = require("../models/SubSection");

// //create subSection

// exports.createSubSection = async(req,res)=>{
//     try{
//         // FIX 2: videoUrl removed from req.body destructuring
//         // video URL comes from Cloudinary upload (uploadDetails.secure_url), not from req.body
//         const {sectionId,title,timeDuration,description}= req.body;
//         //data fetched

//         const video =req.files.videoFile;
//         //video file fetched

//         // FIX 2 (cont): !videoUrl -> !video (validate the actual uploaded file, not a body field)
//         if(!sectionId || !title || !timeDuration || !video || !description){
//             return res.status(404).json({
//                 success:false,
//                 message:"All fields required!!!"
//             })
//         }
//         //validated the data 



//         const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
//         //uploading video nowww


//         // FIX 3: subSection.create -> SubSection.create (was using the bad lowercase duplicate)
//         const subSectionDetails=await SubSection.create({
//             title:title,
//             description:description,
//             timeDuration:timeDuration,
//             videoUrl:uploadDetails.secure_url,
//         })
//         //complete subsection created


//         // FIX 4: variable renamed from updatedsection -> updatedSection (matches response below)
//         const updatedSection = await Section.findByIdAndUpdate(
//             {_id:sectionId},
//             {$push:{
//                 subSection:subSectionDetails
//             }},
//             {new:true},


//             // HW: USE POPULATE HERE TO GET FULL DATA 
//         );



//         return res.status(200).json({
//             success:true,
//             message:"Sub Section createed successfully!!",
//             updatedSection,
//         });
//         //response returned
//     }
//     catch(err){
//         return res.status(500).json({
//                 success:false,
//                 message:"SubSection could not be created!!!"
//             })
//     }
// }




// // HW::: UPDATE SubSection





// // HW::: DELETE SUBSECTION









const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const SubSection = require("../models/SubSection");

//create subSection

exports.createSubSection = async(req,res)=>{
    try{
        // FIX 2: videoUrl removed from req.body destructuring
        // video URL comes from Cloudinary upload (uploadDetails.secure_url), not from req.body
        const {sectionId,title,timeDuration,description}= req.body;
        //data fetched

        const video =req.files.videoFile;
        //video file fetched

        // FIX 2 (cont): !videoUrl -> !video (validate the actual uploaded file, not a body field)
        if(!sectionId || !title || !timeDuration || !video || !description){
            return res.status(404).json({
                success:false,
                message:"All fields required!!!"
            })
        }
        //validated the data 



        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        //uploading video nowww


        // FIX 3: subSection.create -> SubSection.create (was using the bad lowercase duplicate)
        const subSectionDetails=await SubSection.create({
            title:title,
            description:description,
            timeDuration:timeDuration,
            videoUrl:uploadDetails.secure_url,
        })
        //complete subsection created


        // FIX 4: variable renamed from updatedsection -> updatedSection (matches response below)
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$push:{
                subSection:subSectionDetails
            }},
            {new:true},
        ).populate("subSection");
            // HW: USE POPULATE HERE TO GET FULL DATA 



        return res.status(200).json({
            success:true,
            message:"Sub Section createed successfully!!",
            updatedSection,
        });
        //response returned
    }
    catch(err){
        return res.status(500).json({
                success:false,
                message:"SubSection could not be created!!!"
            })
    }
}




// HW::: UPDATE SubSection

exports.updateSubSection = async(req,res)=>{
    try{
        const {subSectionId,title,timeDuration,description} = req.body;
        //data fetched

        if(!subSectionId){
            return res.status(404).json({
                success:false,
                message:"SubSection ID is required!!!"
            })
        }
        //validated the data

        const updateData = {};
        //build update object with only provided fields

        if(title) updateData.title = title;
        if(timeDuration) updateData.timeDuration = timeDuration;
        if(description) updateData.description = description;

        if(req.files && req.files.videoFile){
            const video = req.files.videoFile;
            //new video file fetched

            const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
            //uploading new video to cloudinary

            updateData.videoUrl = uploadDetails.secure_url;
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(
            {_id:subSectionId},
            {$set: updateData},
            {new:true}
        );
        //subsection updated

        if(!updatedSubSection){
            return res.status(404).json({
                success:false,
                message:"SubSection not found!!!"
            })
        }

        return res.status(200).json({
            success:true,
            message:"SubSection updated successfully!!",
            updatedSubSection,
        });
        //response returned
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"SubSection could not be updated!!!"
        })
    }
}




// HW::: DELETE SUBSECTION

exports.deleteSubSection = async(req,res)=>{
    try{
        const {subSectionId,sectionId} = req.body;
        //data fetched

        if(!subSectionId || !sectionId){
            return res.status(404).json({
                success:false,
                message:"SubSection ID and Section ID are required!!!"
            })
        }
        //validated the data


        const sectionExists = await Section.findById(sectionId);
        if (!sectionExists) {
            return res.status(404).json({
                success: false,
                message: "Section not found!!!",
            });
        }
        //check idf section exists



        await SubSection.findByIdAndDelete({_id:subSectionId});
        //subsection deleted from DB

        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},
            {$pull:{
                subSection:subSectionId
            }},
            {new:true}
        ).populate("subSection");
        //subSection reference removed from parent Section, populate for full data

        // if(!updatedSection){
        //     return res.status(404).json({
        //         success:false,
        //         message:"Section not found!!!"
        //     })
        // }

        return res.status(200).json({
            success:true,
            message:"SubSection deleted successfully!!",
            updatedSection,
        });
        //response returned
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"SubSection could not be deleted!!!"
        })
    }
}