import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    equipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    question_type: {
      type: String,
      enum: ["open_ended", "multiple_choice", "statement", "file_upload"],
      required: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
    youtube_link: {
      type: String,
      trim: true,
    },
    question_text: {
      type: String,
      required: true,
      trim: true,
    },
    context: {
      type: [String],
      default: [],
      trim: true,
    },
    options: {
      type: [
        {
          text: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
      required: function () {
        return this.question_type === "multiple_choice";
      },
    },
    allowMultipleSelection: {
      type: Boolean,
      required: function () {
        return this.question_type === "multiple_choice";
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", QuestionSchema);
