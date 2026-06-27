const mongoose=require("mongoose");
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>
    console.log("DB connected successfully!!"))
    .catch((err)=> {
        console.log("Cannot connect to MongoDB!!")
        console.log(err);
        // Removed process.exit(1) so the server doesn't crash on boot if DB fails
    })
    console.log("URL:", process.env.MONGODB_URL);
}