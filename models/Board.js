const mongoose = require("mongoose");
//Create schema
const boardSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cover:{type: String},
    isDeleted:{
      type:Boolean,
      default: false
    },

    users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }], //many to many
    creator: { type: mongoose.SchemaTypes.ObjectId, ref: "User" }, //many to many
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
//Create and export model
const Board = mongoose.model("Board", boardSchema);
module.exports = Board;
