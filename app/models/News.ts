import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  banner: { type: String },
  bannerAlt: { type: String },
  pageTitle: { type: String },
  categories: [
    {
      name: { type: String },
      news: [
        {
          title: { type: String },
          slug: { type: String },
          category: { type: String },
          coverImage: { type: String },
          coverImageAlt: { type: String },
          thumbnail: { type: String },
          thumbnailAlt: { type: String },
          popularNews: { type: String },
          type:{type:String, default:"News"},
          date: { type: Date },
          content: { type: String },
          createdAt: { type: Date, default: Date.now },
          metaTitle: { type: String },
          metaDescription: { type: String },
        },
      ],
    },
  ],
});

export default mongoose.models.News || mongoose.model("News", newsSchema);
