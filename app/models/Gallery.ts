import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
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
        title:{type:String}
    },
    gallery:[{
        title:{type:String},
        categories:[{
            title:{type:String},
            description:{type:String},
            images:[{type:String}],
            type:{type:String, defaul:"Gallery"}
        }]
    }]
})

export default mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);