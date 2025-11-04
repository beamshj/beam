import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
        map: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    }
})

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);