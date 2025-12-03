import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_ar: { type: String },
});

export default mongoose.models.Location ||
  mongoose.model("Location", locationSchema);
