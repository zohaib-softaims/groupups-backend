import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    responses: [
      {
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        user_response: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Interaction = mongoose.model("Interaction", interactionSchema);
