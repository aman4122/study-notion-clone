const mongoose=require("mongoose")

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  birthDate: {
    type: String,
  },
  contact: {
    type: Number,
  },
  about: {
    type: String,
  },
});

module.exports=mongoose.model("Profile",profileSchema);