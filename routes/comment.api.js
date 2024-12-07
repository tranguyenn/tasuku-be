const express = require("express");
const { createComment, getCommentByTaskId, deleteCommentById } = require("../controllers/comment.controller");
const authentication = require("../middlewares/authentication");
const validators = require("../middlewares/validators");
const validateId = require("../middlewares/validateId");
const router = express.Router();

/**
 * @route GET api/comments/:id
 * @description Get comment by task id
 * @access public
 */
router.get("/:id/task",validators.validate(validateId),authentication.loginRequired,getCommentByTaskId);

/**
 * @route POST api/comments
 * @description Create a comment
 * @access public
 * @requiredBody: name,description
 */
router.post("/",authentication.loginRequired, createComment);

//done
//Delete
/**
 * @route DELETE api/comments
 * @description delete a comments done
 * @access manager
 */
router.delete("/:id",authentication.loginRequired, deleteCommentById);
//export
module.exports = router;
//Update
