import mongoose from "mongoose";

const EquipmentSchema = new mongoose.Schema(
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
    industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    trainingAiSnippets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TrainingAiSnippet",
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
    productsVisibility: {
      type: Boolean,
      default: true,
    },
    maxProducts: {
      type: Number,
      default: 3,
      min: [3, "Max Products must be at least 3"],
    },
  },
  { timestamps: true }
);

export const Equipment = mongoose.model("Equipment", EquipmentSchema);
