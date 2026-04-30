



//ISS MODEL MEIN COURSE JO CREATE KIYA AHAI USKE DIFFERENT PARTS MEIN DIVIDED HAAI . 
// PYTHON COURSE  == COURSE.JS
//{1}INTRODUCTION & BASICS \
// {2} CONDITIONAL STATMEENTS........AND OTHER PARTS  == SECTION.JS

//CREATE SECTION HOGA

const mongoose=require("mongoose")

const sectionSchema = new mongoose.Schema({
    sectionName:{
        type:String,
    },
    subSection:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection" 
        }
    ]
})

module.exports=mongoose.model("Section",sectionSchema);