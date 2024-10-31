const express = require("express");
const { createComment, getCommentByTaskId, deleteCommentById } = require("../controllers/comment.controller");
const router = express.Router();

/**
 * @route GET api/comments/:id
 * @description Get comment by task id
 * @access public
 */
router.get("/:id/task",getCommentByTaskId);

/**
 * @route POST api/comments
 * @description Create a comment
 * @access public
 * @requiredBody: name,description
 */
router.post("/", createComment);

//done
//Delete
/**
 * @route DELETE api/comments
 * @description delete a comments done
 * @access manager
 */
router.delete("/:id", deleteCommentById);
//export
module.exports = router;
//Update
