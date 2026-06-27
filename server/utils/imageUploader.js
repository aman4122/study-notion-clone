// const cloudinary = require("cloudinary").v2;

// exports.uploadImageToCloudinary = async (file, folder, quality, height) => {
//     const options = { folder };
//     if (height) {
//         options.height = height;
//     }
//     if (quality) {
//         options.quality = quality;
//     }
//     options.resource_type = "auto";

//     return await cloudinary.uploader.upload(file.tempFilePath, options); 
// };




const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, quality, height) => {
    const options = { folder };
    if (height) options.height = height;
    if (quality) options.quality = quality;

    // ✅ Detect file type and set resource_type accordingly
    const mimeType = file.mimetype || "";
    if (mimeType.startsWith("video/")) {
        options.resource_type = "video";  // unlocks duration in response
    } else {
        options.resource_type = "image";
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
};