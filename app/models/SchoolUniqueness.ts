import mongoose from "mongoose";

const schoolUniquenessSchema = new mongoose.Schema({
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
        description: {
            type: String,
            required: true
        },
        items: [{
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            }
        }]
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
            image: {
                type: String,
                required: true
            },
            imageAlt: {
                type: String,
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    }
})

export default mongoose.models.SchoolUniqueness || mongoose.model("SchoolUniqueness", schoolUniquenessSchema);