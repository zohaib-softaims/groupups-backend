import mongoose from "mongoose";

const IndustrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    industry_image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Industry = mongoose.model("Industry", IndustrySchema);
