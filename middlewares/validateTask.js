const { body } = require("express-validator");
const mongoose = require('mongoose');

const statusEnum = ["pending", "doing", "review", "done"];
// Validation for task creation
const validateTask = [
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a valid string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("description")
    .exists()
    .withMessage("description is required") 
    .isString()
    .withMessage("Description must be a valid string"),
  body("status")
    .exists()
    .withMessage("Status is required")
    .isIn(statusEnum)
    .withMessage(
      `Status must be one of the following: ${statusEnum.join(", ")}`
    ),
  body("boardId")
    .exists()
    .withMessage("Board ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("boardId must be a valid MongoDB ObjectId"),
  body("cover")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isString()
    .withMessage("Cover must be a string if provided")
    .isURL()
    .withMessage("Invalid cover url format"),
];
const validateUpdateTask = [
  body("name")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isString()
    .withMessage("name must be a valid string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("description")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isString()
    .withMessage("Description must be a valid string"),
  body("status")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isIn(statusEnum)
    .withMessage(
      `Status must be one of the following: ${statusEnum.join(", ")}`
    ),
  body("cover")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isString()
    .withMessage("Cover must be a string if provided")
    .isURL()
    .withMessage("Invalid cover url format"),
];

const validateAddReference = [
  body("taskId")
    .exists()
    .withMessage("taskId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("taskId must be a valid MongoDB ObjectId"),

  body("empId")
    .exists()
    .withMessage("empId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("empId must be a valid MongoDB ObjectId"),
];

module.exports = {
  validateTask,
  validateUpdateTask,
  validateAddReference
};
