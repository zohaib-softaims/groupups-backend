import mongoose from "mongoose";

const TrainingAiSnippetSchema = new mongoose.Schema(
  {
    equipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    snippet_text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const TrainingAiSnippet = mongoose.model("TrainingAiSnippet", TrainingAiSnippetSchema);
