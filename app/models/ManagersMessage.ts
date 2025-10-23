import mongoose from "mongoose";

const managersMessageSchema = new mongoose.Schema({
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
        firstDescription: {
            type: String,
            required: true
        },
        secondDescription: {
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
        name: {
            type: String,
            required: true
        },
        designation: {
            type: String,
            required: true
        }
    },
})

export default mongoose.models.ManagersMessage || mongoose.model("ManagersMessage", managersMessageSchema);