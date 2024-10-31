const { body } = require('express-validator');
const status=["pending", "doing", "review", "done"];
// Validation for task creation
const validateTask = [
  body('name')
    .exists().withMessage('name is required')
    .isString().withMessage('name must be a valid string')
    .notEmpty().withMessage('name cannot be empty'),
  body('description')
    .optional() // Description can be optional
    .isString().withMessage('Description must be a valid string'),
    body('status')
    .exists().withMessage('Status is required')
    .isIn(statusEnum).withMessage(`Status must be one of the following: ${statusEnum.join(', ')}`)
];

module.exports = validateTask;