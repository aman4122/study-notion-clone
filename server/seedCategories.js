require("dotenv").config();
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require("mongoose");
const Category = require("./models/Category");

const categoriesData = [
  { name: "Artificial Intelligence", description: "Learn about AI, neural networks, and more." },
  { name: "Machine Learning", description: "Deep dive into ML algorithms and data." },
  { name: "C/C++", description: "Master system-level programming with C and C++." },
  { name: "Problem Solving", description: "Enhance your logical and problem-solving skills." },
  { name: "Data Structures & Algorithms", description: "Prepare for coding interviews with DSA." },
  { name: "Web Development", description: "Build modern web applications." },
  { name: "Data Science", description: "Analyze and interpret complex data." },
  { name: "Cloud Computing", description: "Learn AWS, Azure, and GCP." },
  { name: "Cybersecurity", description: "Protect systems and networks from threats." },
  { name: "Blockchain", description: "Explore decentralized technologies." }
];

async function seedCategories() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");

    for (let cat of categoriesData) {
      const existing = await Category.findOne({ name: cat.name });
      if (!existing) {
        await Category.create(cat);
        console.log(`Added category: ${cat.name}`);
      } else {
        console.log(`Category already exists: ${cat.name}`);
      }
    }
    console.log("Seeding finished.");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

seedCategories();
