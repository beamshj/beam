import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
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
    map: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    phone_ar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    address_ar: {
      type: String,
    },
  },
  secondSection:{
    title:{
      type:String,
      required:true
    },
    title_ar:{
      type:String,
    },
    description:{
      type:String,
      required:true
    },
    description_ar:{
      type:String,
    }
  }
});

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);
