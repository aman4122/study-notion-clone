// const Tag = require("../models/category")
// const Course = require("../models/Course")
//     ("../models/Course")
// //create Tag ka handler


// exports.createCategory = async (req, res) => {
//     try {
//         //fetch data
//         const { name, description } = req.body;
//         //validation
//         if (!name || !description) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Fields are required!!"
//             });
//         }

//         //create entry in DB

//         const categoryDetails = await Tag.crate({
//             name: name,
//             description: description
//         });
//         console.log(categoryDetails)


//         return res.status(200).json({
//             success: true,
//             message: "Category created successfully!!"
//         })
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(401).json({
//             success: false,
//             essage: "Could not create category,please try again!!!"
//         })
//     }
// }



// //getAllCategories



// exports.showAllCategories = async (req, res) => {
//     try {
//         const allCategories = await Tag.find({}, { name: true }, { description: true })
//         return res.status(200).json({
//             success: true,
//             message: "Categories returned successfully!!"
//         })
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(401).json({
//             success: false,
//             message: "Could not find categories!!"
//         })
//     }
// }





// //category ke details .... desired details hai ye
// exports.categoryDetails = async (req, res) => {
//     try {
//         //getcategoryId
//         const { categoryId } = req.body;

//         // get courses for specifided category
//         const selectedCategory = await Category.findById(categoryId)
//             .populate("courses")
//             .exec();
//         //validation
//         if (!selectedCategory) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Data not found!!!"
//             })
//         }
//         // get courses for given category
//         const differentCategory = await Category.find({
//             _id: {
//                 $ne: categoryId   //ne=== not equal
//             },
//         })
//             .populate("courses")
//             .exec();


//         return res.status(200).json({
//             success: true,
//             data: {
//                 selectedCategory,
//                 differentCategory
//             },
//             message: "Category details fetxched!!!!"
//         })

//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             success: false,
//             message: err.message,
//         })
//     }
// }





// //get top sellling courses
// //DIY

// //                                        METTHODD   1  ==== SIMPLE SORTING THE COURSES    {NOT OPTIMAL}


// exports.topSellingCourses = async (req, res) => {
//     try {
//         const courses = await Course.find({}, { title: 1, studentsEnrolled: 1 });
//         //fetched course name and no of students enrolled



//         const topCourses = courses.sort((a, b) =>
//             b.studentsEnrolled.length - a.studentsEnrolled.length
//         ).slice(0, 10)
//         //arrange in descending order...
//         //syntaxxx babyy ,,ISSSEEE RATT LLLEEE
//         console.log(topCourses)


//         return res.status(200).json({
//             success: true,
//             data: {
//                 topCourses
//             }
//         })
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }




// //                                             METHOD 2    ==== MONGODB AGGREGATORS   {OPTIMAL}







const Tag = require("../models/category")
const Course = require("../models/Course")
// FIX 1: Removed stray ("../models/Course") dangling expression
//create Tag ka handler


exports.createCategory = async (req, res) => {
    try {
        //fetch data
        const { name, description } = req.body;
        //validation
        if (!name || !description) {
            return res.status(401).json({
                success: false,
                message: "Fields are required!!"
            });
        }

        //create entry in DB

        // FIX 2: Tag.crate -> Tag.create (typo)
        const categoryDetails = await Tag.create({
            name: name,
            description: description
        });
        console.log(categoryDetails)


        return res.status(200).json({
            success: true,
            message: "Category created successfully!!"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            // FIX 3: "essage" -> "message" (missing m)
            message: "Could not create category,please try again!!!"
        })
    }
}



//getAllCategories



exports.showAllCategories = async (req, res) => {
    try {
        // FIX 4: Wrong projection syntax — merged into single object
        // FIX 5: allCategories now returned in response data
        const allCategories = await Tag.find({}, { name: true, description: true })
        return res.status(200).json({
            success: true,
            data: allCategories,
            message: "Categories returned successfully!!"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(401).json({
            success: false,
            message: "Could not find categories!!"
        })
    }
}





//category ke details .... desired details hai ye
exports.categoryDetails = async (req, res) => {
    try {
        //getcategoryId
        const { categoryId } = req.body;

        // get courses for specifided category
        // FIX 6: Category -> Tag (Category was never defined/imported)
        const selectedCategory = await Tag.findById(categoryId)
            .populate("courses")
            .exec();
        //validation
        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Data not found!!!"
            })
        }
        // get courses for given category
        // FIX 6 (cont): Category -> Tag
        const differentCategory = await Tag.find({
            _id: {
                $ne: categoryId   //ne=== not equal
            },
        })
            .populate("courses")
            .exec();


        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory
            },
            message: "Category details fetxched!!!!"
        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        })
    }
}





//get top sellling courses
//DIY

//                                        METTHODD   1  ==== SIMPLE SORTING THE COURSES    {NOT OPTIMAL}


exports.topSellingCourses = async (req, res) => {
    try {
        const courses = await Course.find({}, { title: 1, studentsEnrolled: 1 });
        //fetched course name and no of students enrolled



        const topCourses = courses.sort((a, b) =>
            b.studentsEnrolled.length - a.studentsEnrolled.length
        ).slice(0, 10)
        //arrange in descending order...
        //syntaxxx babyy ,,ISSSEEE RATT LLLEEE
        console.log(topCourses)


        return res.status(200).json({
            success: true,
            data: {
                topCourses
            }
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.getCategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;

        const selectedCategory = await Tag.findById(categoryId).exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found!!!"
            });
        }

        const categoryCourses = await Course.find({ category: categoryId })
            .populate("instructor")
            .exec();

        const differentCategory = await Tag.find({ _id: { $ne: categoryId } }).exec();

        const mostSellingCourses = await Course.find()
            .sort({ studentsEnrolled: -1 })
            .limit(10)
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory: {
                    ...selectedCategory._doc,
                    courses: categoryCourses
                },
                differentCategory,
                mostSellingCourses
            },
            message: "Category page details fetched successfully!!"
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}





exports.seedCategories = async (req, res) => {
    try {
        const categories = [
            { name: "Web Development", description: "Learn frontend and backend web development including HTML, CSS, JavaScript, React, Node.js and more." },
            { name: "Data Science", description: "Explore data analysis, visualization, statistics and tools like Pandas, NumPy and Matplotlib." },
            { name: "Machine Learning", description: "Master ML algorithms, model training, evaluation and frameworks like TensorFlow and PyTorch." },
            { name: "Android Development", description: "Build Android apps using Java, Kotlin and Android Studio." },
            { name: "Cloud Computing", description: "Learn AWS, Azure, GCP and cloud infrastructure concepts." },
            { name: "Cybersecurity", description: "Understand ethical hacking, network security, cryptography and penetration testing." },
            { name: "DSA / Competitive Programming", description: "Master Data Structures, Algorithms and problem solving for coding interviews and contests." },
            { name: "UI/UX Design", description: "Design beautiful user interfaces and experiences using Figma, wireframing and design principles." },
        ];

        await Tag.insertMany(categories);

        return res.status(200).json({
            success: true,
            message: "Categories seeded successfully!!",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Failed to seed categories!!",
            error: err.message,
        });
    }
};



//                                             METHOD 2    ==== MONGODB AGGREGATORS   {OPTIMAL}