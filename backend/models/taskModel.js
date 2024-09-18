const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["to_do", "in_progress", "done"],
    required: true,
  },
});

module.exports = Task = mongoose.model("Task", taskSchema);
