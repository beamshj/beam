import mongoose from "mongoose";

const learningProgramSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  bannerAlt: {
    type: String,
  },
  bannerAlt_ar: {
    type: String,
  },
  metaTitle: {
    type: String,
    required: true,
  },
  metaTitle_ar: {
    type: String,
  },
  metaDescription: {
    type: String,
    required: true,
  },
  metaDescription_ar: {
    type: String,
  },
  pageTitle: {
    type: String,
    required: true,
  },
  pageTitle_ar: {
    type: String,
  },
  firstSection: {
    mainTitle: {
      type: String,
      required: true,
    },
    mainTitle_ar: {
      type: String,
    },
    subTitle: {
      type: String,
      required: true,
    },
    subTitle_ar: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    description_ar: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    imageAlt: {
      type: String,
    },
    imageAlt_ar: {
      type: String,
    },
  },
});

export default mongoose.models.LearningProgram ||
  mongoose.model("LearningProgram", learningProgramSchema);
