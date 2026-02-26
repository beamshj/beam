import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  footerTitle: {
    type: String,
  },
  footerTitle_ar: {
    type: String,
  },
  addressSection: {
    lineOne: {
      type: String,
    },
    lineOne_ar: {
      type: String,
    },
    email: {
      type: String,
    },
    lineThree: {
      type: String,
    },
    lineThree_ar: {
      type: String,
    },
    lineFour: {
      type: String,
    },
    lineFour_ar: {
      type: String,
    },
  },
  quickLinksSection: {
    title: {
      type: String,
    },
    title_ar: {
      type: String,
    },
    quickLinks: [
      {
        name: {
          type: String,
        },
        name_ar: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
  },
  socialLinks: {
    links: [
      {
        icon: {
          type: String,
        },
        iconAlt: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
  },
});

const Footer = mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default Footer;
