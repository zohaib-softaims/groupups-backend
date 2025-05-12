import mongoose from "mongoose";

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

export default Subcategory;
