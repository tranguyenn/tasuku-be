const { body } = require("express-validator");

// Validation for user creation
const validateBoard = [
  body("name")
    .exists()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a valid string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("description")
    .exists()
    .withMessage("description is required") // Description can be optional
    .isString()
    .withMessage("Description must be a valid string"),
  body("cover")
    .optional({ nullable: true }) // Allows the field to be missing or null
    .isString()
    .withMessage("Cover must be a string if provided")
    .isURL()
    .withMessage("Invalid cover url format"),
  body("creator")
    .exists()
    .withMessage("creator is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("creator must be a valid MongoDB ObjectId"),
];
const validateAddMemberToBoard = [
  body("boardId")
    .exists()
    .withMessage("boardId is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("boardId must be a valid MongoDB ObjectId"),
  body("email")
    .exists()
    .withMessage("Email field is required")
    .isString()
    .withMessage("Email must be a valid string")
    .isEmpty()
    .withMessage("Email cannot be empty")
    .isLength({ min: 6, max: 255 })
    .withMessage("Email field must be in length 6 to 255")
    .isEmail()
    .withMessage("Invalid email"),
];
module.exports = {
  validateBoard,
  validateAddMemberToBoard
};
