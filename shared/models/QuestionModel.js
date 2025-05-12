import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
  priority: { type: Number, required: true },
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
