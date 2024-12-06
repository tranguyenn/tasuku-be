const express = require("express");
const { getBoardById, createBoard, addMemberToBoard } = require("../controllers/board.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();

/**
 * @route GET api/boards
 * @description Get board detail
 * @access login required 
 */
router.get("/:id",authentication.loginRequired,getBoardById);

/**
 * @route POST api/boards
 * @description Create a task
 * @access login required 
 */
router.post("/",authentication.loginRequired, createBoard);

/**
 * @route PUT api/boards/assignee
 * @description update assignee to a board
 * @access login required 
 * @requires: taskId,empId
 */
router.put("/assignee",authentication.loginRequired, addMemberToBoard);

//export
module.exports = router;
//Update
