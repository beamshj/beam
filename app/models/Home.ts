import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
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
  bannerSection: {
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
        },
        title_ar: {
          type: String,
        },
        highlightText: {
          type: String,
          required: true,
        },
        highlightText_ar: {
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
  },
  thirdSection: {
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
      required: true,
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
          required: true,
        },
      },
    ],
  },
  fourthSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
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
    videoLink: {
      type: String,
      required: true,
    },
  },
  fifthSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
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
        number: {
          type: String,
          required: true,
        },
        number_ar: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
        value_ar: {
          type: String,
          required: true,
        },
      },
    ],
  },
  sixthSection: {
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
      required: true,
    },
  },
  seventhSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonText_ar: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    link_ar: {
      type: String,
      required: true,
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
        name: {
          type: String,
          required: true,
        },
        name_ar: {
          type: String,
          required: true,
        },
        course: {
          type: String,
          required: true,
        },
        course_ar: {
          type: String,
          required: true,
        },
      },
    ],
  },
  eighthSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
      required: true,
    },
  },
  ninethSection: {
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
      },
    ],
  },
  tenthSection: {
    title: {
      type: String,
      required: true,
    },
    title_ar: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    description_ar: {
      type: String,
      required: true,
    },
    bigImage: {
      type: String,
      required: true,
    },
    bigImageAlt: {
      type: String,
    },
    bigImageAlt_ar: {
      type: String,
    },
    smallImage: {
      type: String,
      required: true,
    },
    smallImageAlt: {
      type: String,
    },
    smallImageAlt_ar: {
      type: String,
    },
    buttonText: {
      type: String,
      required: true,
    },
    buttonText_ar: {
      type: String,
      required: true,
    },
  },
});

export default mongoose.models.Home || mongoose.model("Home", homeSchema);
