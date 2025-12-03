import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_ar: { type: String },
});

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
