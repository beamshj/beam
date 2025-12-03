import mongoose from "mongoose";

const testimonialsSchema = new mongoose.Schema({
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
    description: {
      type: String,
      required: true,
    },
    description_ar: {
      type: String,
    },
    items: [
      {
        title: {
          type: String,
          required: true,
        },
        title_ar: {
          type: String,
        },
        description: {
          type: String,
          required: true,
        },
        description_ar: {
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
    ],
  },
  secondSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    description_ar: {
      type: String,
    },
    items: [
      {
        video: {
          type: String,
          required: true,
        },
        poster: {
          type: String,
          required: true,
        },
      },
    ],
  },
  thirdSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    items: [
      {
        video: {
          type: String,
          required: true,
        },
        poster: {
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
    ],
  },
});

export default mongoose.models.Testimonials ||
  mongoose.model("Testimonials", testimonialsSchema);
