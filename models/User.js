const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
//Create schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 225,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    select: false
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "manager"],
  },
  boards: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Board" }], //many to many
  tasks: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Task" }], //many to many
});
userSchema.methods.generateToken = async function () {
  const accessToken = await jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
};

//Create and export model
const User = mongoose.model("User", userSchema);
module.exports = User;
