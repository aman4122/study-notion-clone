const express= require("express")

const app = express();

const userRoutes = require("./routes/User.js")
const profileRoutes = require("./routes/Profile.js");
const paymentRoutes = require("./routes/Payments.js");
const courseRoutes = require("./routes/Course.js");

const database = require("./config/database.js");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary")

const fileUpload = require("express-fileupload");
const dotenv = require("dotenv"); 
const dns=require("dns")


dns.setServers(["1.1.1.1","8.8.8.8"]);


dotenv.config();
const crypto = require("crypto");
process.env.JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_development_only";

const PORT = process.env.PORT || 4000;
//ye upar wala backend ka port hai
//database connect
database.connect();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
      "http://localhost:3000", 
      "https://study-notion-clone-frontend-nhj3fnot0-aman412211.vercel.app/", // Your Vercel domain
      "https://study-notion-clone-xwyp.vercel.app" 
    ],
        ////ye upar wala frontend ka port hai (now supports deployment URL via FRONTEND_URL)

        credentials:true,
    })
)

//cloudinary connection
cloudinaryConnect();



app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)




// console.log("user:", userRoutes);
// console.log("profile:", profileRoutes);
// console.log("payments:", paymentRoutes);
// console.log("course:", courseRoutes);


//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payments",paymentRoutes);
app.use("/api/v1/course",courseRoutes);


///def route

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is working..."
    })
})

app.listen(PORT,()=>{
    console.log(`App is runnning at ${PORT}`)
});

// Export the Express API
module.exports = app;