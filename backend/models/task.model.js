const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      require: true,
      unique: false,
      trim: true,
      minlength: 10,
    },
    taskStatus: {
      type: Boolean,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
