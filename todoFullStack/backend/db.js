import mongoose from "mongoose";

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Todo = mongoose.model("Todo", TodoSchema);
