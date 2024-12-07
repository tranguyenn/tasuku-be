const { body } = require("express-validator");
const statusEnum = ["user", "manager"];

// Validation for user creation
const validateUser = [
  body("name")
    .exists()
    .withMessage("Name field is required")
    .isString()
    .withMessage("Name must be a valid string")
    .notEmpty()
    .withMessage("Name cannot be empty"),
  body("avatar").custom((value) => {
    if (
      value === "" ||
      (typeof value === "string" &&
        /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(value))
    ) {
      return true; // Valid if empty string or valid URL
    }
    throw new Error("Avatar must be an empty string or a valid URL string");
  }),
  body("email")
    .exists()
    .withMessage("Email field is required")
    .isString()
    .withMessage("Email must be a valid string")
    .isLength({ min: 6, max: 255 })
    .withMessage("Email field must be in length 6 to 255")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .exists()
    .withMessage("Password field is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Password field must be in length 2 to 255"),
  body("role")
    .isIn(statusEnum)
    .withMessage(`Role must be in the list${statusEnum.join(", ")}`),
];
const validateLogin = [
  body("email")
    .exists()
    .withMessage("Email field is required")
    .isString()
    .withMessage("Email must be a valid string")
    .isLength({ min: 6, max: 255 })
    .withMessage("Email field must be in length 6 to 255")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .exists()
    .withMessage("Password field is required")
    .isLength({ min: 2, max: 255 })
    .withMessage("Password field must be in length 2 to 255"),
];
const validateGetByEmail = [
  body("name")
    .exists()
    .withMessage("Email field is required")
    .isString()
    .withMessage("Email must be a valid string")
    .isLength({ min: 6, max: 255 })
    .withMessage("Email field must be in length 6 to 255")
    .isEmail()
    .withMessage("Invalid email"),
];

module.exports = {
  validateUser,
  validateLogin,
  validateGetByEmail,
};
