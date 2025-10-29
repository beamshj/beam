import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner:{type:String},
    bannerAlt:{type:String},
    pageTitle:{type:String},
    firstSection:{
        title:{type:String,required:true},
        description:{type:String,required:true},
    },
    schools:[{
        title:{type:String,required:true},
        location:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Location"},
        address:{type:String,required:true},
        category:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Category"},
        image:{type:String,required:true},
        imageAlt:{type:String,required:true},
        logo:{type:String,required:true},
        logoAlt:{type:String,required:true},
        link:{type:String,required:true},
        specifications:[{
            number:{type:String,required:true},
            value:{type:String,required:true},
        }],
    }],
})

export default mongoose.models.School || mongoose.model("School", schoolSchema);