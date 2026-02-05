import mongoose from "mongoose";

const AlumniSchema = new mongoose.Schema({
    metaTitle: {
        type: String,
    },
    metaTitle_ar: { type: String },
    metaDescription: {
        type: String,
    },
    metaDescription_ar: { type: String },
    banner: { type: String },
    bannerAlt: { type: String },
    bannerAlt_ar: { type: String },
    pageTitle: { type: String },
    pageTitle_ar: { type: String },
    mainSection: {
        title: { type: String },
        title_ar: { type: String },
        description: { type: String },
        description_ar: { type: String },
        image: { type: String },
        imageAlt: { type: String },
        imageAlt_ar: { type: String },
    },
    countryCardSection: {
        items: [{
            name: { type: String },
            name_ar: { type: String },
            flag: { type: String },
            flagAlt: { type: String },
            flagAlt_ar: { type: String },
            universities: { type: String },
            universities_ar: { type: String },
        }]
    },
    testimonialsSection: {
        headingOne: { type: String },
        headingOne_ar: { type: String },
        headingTwo: { type: String },
        headingTwo_ar: { type: String },
        items: [{
            name: { type: String },
            name_ar: { type: String },
            content: { type: String },
            content_ar: { type: String },
            profileImage: { type: String },
            profileImageAlt: { type: String },
            profileImageAlt_ar: { type: String },
        }]
    },
});

export default mongoose.models.Alumni || mongoose.model("Alumni", AlumniSchema);
