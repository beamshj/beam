import mongoose from "mongoose";

const scholarshipProgramsSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    pageTitle: {
        type: String,
        required: true
    },
    firstSection: {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
        description: {
            type: String,
            required: true
        }
    },
    secondSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        items: [{
            title: {
                type: String,
                required: true
            }
        }]
    },
    thirdSection:{
        mainTitle:{
            type:String,
            required:true
        },
        firstDescription:{
            type:String,
            required:true
        },
        subTitle:{
            type:String,
            required:true
        },
        secondDescription:{
            type:String,
            required:true
        },
        items:[{
            title:{
                type:String,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            imageAlt:{
                type:String,
            },
            description:{
                type:String,
                required:true
            }
        }]
    },
    fourthSection:{
        title:{
            type:String,
            required:true
        },
        image:{
            type:String,
            required:true
        },
        imageAlt:{
            type:String,
        },
        description:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        buttonText:{
            type:String,
            required:true
        }
    }
})

export default mongoose.models.ScholarshipPrograms || mongoose.model("ScholarshipPrograms", scholarshipProgramsSchema);