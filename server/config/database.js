const mongoose=require("mongoose");
require("dotenv").config();


exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>
    console.log("DB connected successfully!!"))
    .catch((err)=> {console.log("Cannot connect!!")
        console.log(err);
        process.exit(1);
    })
    console.log("URL:", process.env.MONGODB_URL);
}