import mongoose from "mongoose";

const interactionSchema = new mongoose.Schema(
  {
    equipment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Equipment",
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    equipment_snapshot: {
      name: {
        type: String,
        required: true,
      },
    },
    industry_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Industry",
      required: true,
    },
    industry_snapshot: {
      name: {
        type: String,
        required: true,
      },
    },
    responses: [
      {
        question_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        question_snapshot: {
          question_text: {
            type: String,
            required: true,
          },
          question_type: {
            type: String,
            required: true,
          },
          required: {
            type: Boolean,
            default: false,
          },
          youtube_link: {
            type: String,
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
