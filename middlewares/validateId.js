const { param } = require('express-validator');
const mongoose = require('mongoose');

// Validation for routes that require _id
const validateId = [
  param('id')
    .exists().withMessage('_id is required')
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage('_id must be a valid MongoDB ObjectId')
];

module.exports = validateId;