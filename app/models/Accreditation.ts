import mongoose from "mongoose";

const accreditationSchema = new mongoose.Schema({
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
        title:{type:String},
        description:{type:String},
        image:{type:String},
        imageAlt:{type:String},
    },
    categories:[{
        name:{type:String},
        accreditations:[{
            title:{type:String},
            description:{type:String},
            image:{type:String},
            imageAlt:{type:String},
            category:{type:String},
        }]
    }],
})

export default mongoose.models.Accreditation || mongoose.model("Accreditation", accreditationSchema);