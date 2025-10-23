import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaDescription: {
        type: String,
    },
    banner:{type:String},
    bannerAlt:{type:String},
    pageTitle:{type:String},
    categories:[{
        name:{type:String},
        blogs:[{
            title:{type:String},
            slug:{type:String},
            category:{type:String},
            coverImage:{type:String},
            coverImageAlt:{type:String},
            thumbnail:{type:String},
            thumbnailAlt:{type:String},
            date:{type:Date},
            content:{type:String},
            createdAt:{type:Date,default:Date.now},
            metaTitle:{type:String},
            metaDescription:{type:String},
        }]
    }],
})

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);