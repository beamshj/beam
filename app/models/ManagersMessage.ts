import mongoose from "mongoose";

const managersMessageSchema = new mongoose.Schema({
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
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    firstDescription: {
      type: String,
      required: true,
    },
    firstDescription_ar: {
      type: String,
    },
    secondDescription: {
      type: String,
      required: true,
    },
    secondDescription_ar: {
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
    name: {
      type: String,
      required: true,
    },
    name_ar: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    designation_ar: {
      type: String,
    },
  },
});

export default mongoose.models.ManagersMessage ||
  mongoose.model("ManagersMessage", managersMessageSchema);
