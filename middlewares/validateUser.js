const { body } = require('express-validator');

// Validation for user creation
const validateUser = [
  body('name')
    .exists().withMessage('Name field is required')
    .isString().withMessage('Name must be a valid string')
    .notEmpty().withMessage('Name cannot be empty')
];

module.exports = validateUser;
