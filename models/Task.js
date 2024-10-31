const mongoose = require("mongoose");
//Create schema
const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cover:{type: String},

    status: {
      type: String,
      enum: ["pending", "doing", "review", "done"],
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, 
    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], 
    board: { type: mongoose.SchemaTypes.ObjectId, ref: "Board" }, //one to one optional
    //many to many //one to one optional
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
   

  }
);
//Create and export model
const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
