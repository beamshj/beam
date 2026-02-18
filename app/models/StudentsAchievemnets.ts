import mongoose from "mongoose";

const StudentsAchievemnetsSchema = new mongoose.Schema({
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
    intro: {
      type: String,
    },
    intro_ar: {
      type: String,
    },
    secondIntro: {
      type: String,
    },
    secondIntro_ar: {
      type: String,
    },
    content: {
      type: String,
    },
    content_ar: {
      type: String,
    },
    image: {
      type: String,
    },
    imageAlt: {
      type: String,
    },
    imageAlt_ar: {
      type: String,
    },
  },
});

const StudentsAchievemnets =
  mongoose.models.StudentsAchievemnets ||
  mongoose.model("StudentsAchievemnets", StudentsAchievemnetsSchema);

export default StudentsAchievemnets;
