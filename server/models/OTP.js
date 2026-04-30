//                 OTP DATA CONTAINED HERE
const mongoose=require("mongoose")
const mailSender = require("../utils/mailSender")  
const otpTemplate = require("../mail/templates/emailVerificationTemplate") 


const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:300,
    }
})



//pre middle ware abhi define karna padega

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse =await mailSender(email,"Verification email from StudyNotion",otpTemplate(otp));
        console.log(mailResponse)
    }
    catch(err){
        console.error("Error occured while sending mail:",err.message);
        throw err;
    }

}
//next ka kaam jyada kuvh nhi bas NEXT MIDDLEWARE PE JAANA HOTA HAIIIIII

//define premiddleware before saving 
OTPSchema.pre("save",async function (){
    await sendVerificationEmail(this.email,this.otp);
});




module.exports=mongoose.model("OTP",OTPSchema);