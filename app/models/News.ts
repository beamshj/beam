import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
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
  categories: [
    {
      name: { type: String },
      name_ar: { type: String },
      news: [
        {
          title: { type: String },
          title_ar: { type: String },
          slug: { type: String },
          category: { type: String },
          category_ar: { type: String },
          coverImage: { type: String },
          coverImageAlt: { type: String },
          coverImageAlt_ar: { type: String },
          thumbnail: { type: String },
          thumbnailAlt: { type: String },
          thumbnailAlt_ar: { type: String },
          popularNews: { type: String },
          type:{type:String, default:"News"},
          date: { type: Date },
          content: { type: String },
          content_ar: { type: String },
          createdAt: { type: Date, default: Date.now },
          metaTitle: { type: String },
          metaTitle_ar: { type: String },
          metaDescription: { type: String },
          metaDescription_ar: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.models.News || mongoose.model("News", newsSchema);
