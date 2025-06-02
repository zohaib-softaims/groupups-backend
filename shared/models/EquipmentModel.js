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
  },
  { timestamps: true }
);

export const Equipment = mongoose.model("Equipment", EquipmentSchema);
