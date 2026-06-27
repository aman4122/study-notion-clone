
const Tag = require("../models/category")


//create Tag ka handler

// MIGRATION: createTag -> createCategory
exports.createCategory = async(req,res) =>{
    try{
        //fetch data
        const {name,description} = req.body;
        //validation
        if(!name || !description){
            return res.status(401).json({
                success:false,
                message:"Fields are required!!"
            });
        }

        //create entry in DB

        // FIX 1: Tag.crate -> Tag.create (typo)
        const tagDetails = await Tag.create({
            name:name,
            description:description
        });
        console.log(tagDetails)


        return res.status(200).json({
            success:true,
            message:"Tag created successfully!!"
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            // FIX 2: essage -> message (missing m)
            message:"Could not create tags,please try again!!!"
        })
    }
}



//getAllTags

exports.showAllCategories = async( req,res ) => {
    try{
        // FIX 3: Wrong projection syntax — two separate objects merged into one
        // FIX 4: allTags fetched but never returned in response data
        const allTags = await Tag.find({},{name:true, description:true})
        return res.status(200).json({
            success:true,
            data:allTags,
            message:"Tags returned successfully!!"
        })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Could not find tags!!"
        })
    }
}