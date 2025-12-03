import mongoose from "mongoose";

const accreditationSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaTitle_ar:{type:String},
    metaDescription: {
        type: String,
    },
    metaDescription_ar:{type:String},
    banner:{type:String},
    bannerAlt:{type:String},
    bannerAlt_ar:{type:String},
    pageTitle:{type:String},
    pageTitle_ar:{type:String},
    firstSection:{
        title:{type:String},
        title_ar:{type:String},
        description:{type:String},
        description_ar:{type:String},
        image:{type:String},
        imageAlt:{type:String},
        imageAlt_ar:{type:String},
    },
    categories:[{
        name:{type:String},
        name_ar:{type:String},
        accreditations:[{
            title:{type:String},
            title_ar:{type:String},
            description:{type:String},
            description_ar:{type:String},
            image:{type:String},
            imageAlt:{type:String},
            imageAlt_ar:{type:String},
            category:{type:String},
            category_ar:{type:String},
        }]
    }],
})

export default mongoose.models.Accreditation || mongoose.model("Accreditation", accreditationSchema);