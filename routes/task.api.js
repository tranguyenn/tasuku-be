const express = require("express");
const { getTaskById, getTaskByBoardId, createTask, addReference, updateTask, deleteTaskById } = require("../controllers/task.controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();
//done
/**
 * @route GET api/tasks/:id
 * @description Get task by id done
 * @access login required 
 */
router.get("/:id",authentication.loginRequired, getTaskById);

//done
/**
 * @route GET api/tasks
 * @description Get all task by board
 * @access login required 
 * @query : name,status,createAt,updateAt 
 */
router.get("/:id/board",authentication.loginRequired, getTaskByBoardId);

//done
/**
 * @route POST api/tasks
 * @description Create a task
 * @access login required
 * @requiredBody: name,description
 */
router.post("/",authentication.loginRequired, createTask);

//done
/**
 * @route PUT api/tasks/assignee
 * @description update assignee to a task
 * @access login required
 * @requires: taskId,empId
 */
router.put("/assignee",authentication.loginRequired, addReference);

//done
/**
 * @route PUT api/tasks/detail
 * @description update status/description to a task done
 * @access login required
 */
router.put("/:id",authentication.loginRequired,updateTask);

//done
//Delete
/**
 * @route DELETE api/tasks
 * @description delete a task done
 * @access login required
 */
router.delete("/:id",authentication.loginRequired, deleteTaskById);
//export
module.exports = router;
//Update
