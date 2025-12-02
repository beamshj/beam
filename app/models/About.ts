import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
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
    highlight: {
      type: String,
      required: true,
    },
    highlight_ar: {
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
    items: [
      {
        logo: {
          type: String,
          required: true,
        },
        logoAlt: {
          type: String,
        },
        logoAlt_ar: {
          type: String,
        },
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
      },
    ],
  },
  historySection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    items: [
      {
        year: {
          type: String,
          required: true,
        },
        year_ar: {
          type: String,
        },
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
    ],
  },
  fifthSection: {
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
  sixthSection: {
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
        title: {
          type: String,
          required: true,
        },
        title_ar: {
          type: String,
        },
      },
    ],
  },
  seventhSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
    },
    items: [
      {
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
        title: {
          type: String,
          required: true,
        },
        title_ar: {
          type: String,
        },
        link: {
          type: String,
          required: true,
        },
        link_ar: {
          type: String,
        },
      },
    ],
  },
});

export default mongoose.models.About || mongoose.model("About", aboutSchema);
