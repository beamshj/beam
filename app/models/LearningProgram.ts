import mongoose from "mongoose";

const learningProgramSchema = new mongoose.Schema({
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
        mainTitle: {
            type: String,
            required: true
        },
        subTitle: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        imageAlt: {
            type: String,
        }
    },
})

export default mongoose.models.LearningProgram || mongoose.model("LearningProgram", learningProgramSchema);