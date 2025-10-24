import mongoose from "mongoose";

const testimonialsSchema = new mongoose.Schema({
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
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            designation: {
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
            video: {
                type: String,
                required: true
            },
            poster: {
                type: String,
                required: true
            }
        }]
    },
    thirdSection: {
        title: {
            type: String,
            required: true
        },
        items: [{
            video: {
                type: String,
                required: true
            },
            poster: {
                type: String,
            },
            name: {
                type: String,
                required: true
            },
            designation: {
                type: String,
                required: true
            },
        }]
    }
})

export default mongoose.models.Testimonials || mongoose.model("Testimonials", testimonialsSchema);