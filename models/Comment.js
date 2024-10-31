const mongoose = require("mongoose");
//Create schema
const commentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    isDeleted:{
      type:Boolean,
      default: false
    }, 
    task: { type: mongoose.SchemaTypes.ObjectId, ref: "Task" },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, 
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
//Create and export model
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
