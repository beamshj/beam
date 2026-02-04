import mongoose from "mongoose";

const scholarshipProgramsSchema = new mongoose.Schema({
    banner: {
        type: String,
        required: true
    },
    bannerAlt: {
        type: String,
    },
    bannerAlt_ar: {
        type: String,
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaTitle_ar: {
        type: String,
    },
    metaDescription: {
        type: String,
        required: true
    },
    metaDescription_ar: {
        type: String,
    },
    pageTitle: {
        type: String,
        required: true
    },
    pageTitle_ar: {
        type: String,
    },
    firstSection: {
        title: {
            type: String,
            required: true
        },
        title_ar: {
            type: String,
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        },
        imageAlt_ar: {
            type: String,
        },
        description: {
            type: String,
            required: true
        },
        description_ar: {
            type: String,
            required: true
        }
    },
    secondSection: {
        title: {
            type: String,
            required: true
        },
        title_ar: {
            type: String,
        },
        description: {
            type: String,
            required: true
        },
        description_ar: {
            type: String,
        },
        items: [{
            title: {
                type: String,
                required: true
            },
            title_ar: {
                type: String,
            },
        }]
    },
    thirdSection:{
        mainTitle:{
            type:String,
            required:true
        },
        mainTitle_ar:{
            type:String,
        },
        firstDescription:{
            type:String,
            required:true
        },
        firstDescription_ar:{
            type:String,
        },
        subTitle:{
            type:String,
            required:true
        },
        subTitle_ar:{
            type:String,
        },
        secondDescription:{
            type:String,
            required:true
        },
        secondDescription_ar:{
            type:String,
        },
        items:[{
            title:{
                type:String,
                required:true
            },
            title_ar:{
                type:String,
            },
            image:{
                type:String,
                required:true
            },
            imageAlt:{
                type:String,
            },
            imageAlt_ar:{
                type:String,
            },
            description:{
                type:String,
                required:true
            },
            description_ar:{
                type:String,
            }
        }]
    },
    fourthSection:{
        title:{
            type:String,
            required:true
        },
        title_ar:{
            type:String,
        },
        image:{
            type:String,
            required:true
        },
        imageAlt:{
            type:String,
        },
        imageAlt_ar:{
            type:String,
        },
        description:{
            type:String,
            required:true
        },
        description_ar:{
            type:String,
        },
        email:{
            type:String,
            required:true
        },
        email_ar:{
            type:String,
        },
        buttonText:{
            type:String,
            required:true
        },
        buttonText_ar:{
            type:String,
        }
    },
    fifthSection:{
        title:{
            type:String,
        },
        title_ar:{
            type:String,
        },
        description:{
            type:String,
        },
        description_ar:{
            type:String,
        },
        email:{
            type:String,
        },
        footerText:{
            type:String,
        },
        footerText_ar:{
            type:String,
        }
    }
})

export default mongoose.models.ScholarshipPrograms || mongoose.model("ScholarshipPrograms", scholarshipProgramsSchema);