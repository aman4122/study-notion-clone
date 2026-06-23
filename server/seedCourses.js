require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const Category = require("./models/Category");
const User = require("./models/User");
const Profile = require("./models/Profile");
const Course = require("./models/Course");

async function seedCourses() {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB.");

        const categories = await Category.find({});
        if (categories.length === 0) {
            console.log("No categories found. Please seed categories first.");
            return;
        }

        // Find or create an instructor
        let instructor = await User.findOne({ accountType: "Instructor" });
        if (!instructor) {
            const profile = await Profile.create({ about: "Dummy Instructor" });
            instructor = await User.create({
                firstName: "Dummy",
                lastName: "Instructor",
                email: "dummy@instructor.com",
                password: "password123",
                accountType: "Instructor",
                additionalDetails: profile._id,
                image: "https://api.dicebear.com/5.x/initials/svg?seed=Dummy%20Instructor",
                token: "dummy"
            });
            console.log("Created dummy instructor.");
        }

        for (let cat of categories) {
            const courseName = `Mastering ${cat.name}`;
            const existingCourse = await Course.findOne({ courseName, category: cat._id });
            
            if (!existingCourse) {
                const newCourse = await Course.create({
                    courseName: courseName,
                    courseDescription: `A comprehensive course on ${cat.name} designed to take you from beginner to expert.`,
                    instructor: instructor._id,
                    whatYouWillLearn: `Everything about ${cat.name}.`,
                    price: Math.floor(Math.random() * 5000) + 1000,
                    thumbnail: `https://via.placeholder.com/800x400?text=${encodeURIComponent(cat.name)}`,
                    category: cat._id,
                    studentsEnrolled: []
                });

                // Add course to instructor
                await User.findByIdAndUpdate(instructor._id, { $push: { courses: newCourse._id } });
                // Add course to category
                await Category.findByIdAndUpdate(cat._id, { $push: { courses: newCourse._id } });

                console.log(`Added course: ${newCourse.courseName}`);
            } else {
                console.log(`Course already exists: ${courseName}`);
            }
        }
        console.log("Seeding finished.");
    } catch (error) {
        console.error("Error seeding courses:", error);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seedCourses();
