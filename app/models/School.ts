import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaTitle_ar: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaDescription_ar: {
    type: String,
  },
  banner: { type: String },
  bannerAlt: { type: String },
  bannerAlt_ar: { type: String },
  pageTitle: { type: String },
  pageTitle_ar: { type: String },
  firstSection: {
    title: { type: String, required: true },
    title_ar: { type: String },
    description: { type: String, required: true },
    description_ar: { type: String },
  },
  schools: [
    {
      title: { type: String, required: true },
      title_ar: { type: String },
      location: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Location",
      },
      address: { type: String, required: true },
      address_ar: { type: String },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
      image: { type: String, required: true },
      imageAlt: { type: String, required: true },
      imageAlt_ar: { type: String },
      logo: { type: String, required: true },
      logo_ar: { type: String },
      logoAlt: { type: String, required: true },
      logoAlt_ar: { type: String },
      link: { type: String, required: true },
      link_ar: { type: String },
      specifications: [
        {
          number: { type: String, required: true },
          number_ar: { type: String },
          value: { type: String, required: true },
          value_ar: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.models.School || mongoose.model("School", schoolSchema);
