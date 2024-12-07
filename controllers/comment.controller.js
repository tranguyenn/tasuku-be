const { sendResponse, AppError } = require("../helpers/utils.js");
const Board = require("../models/Board.js");

const Task = require("../models/Task.js");
const User = require("../models/User.js");
const Comment = require("../models/Comment.js");

const commentController = {};

//Create a task
commentController.createComment = async (req, res, next) => {
  //in real project you will getting info from req
  try {
  const { content,taskId } = req.body;
  if(!content){
    throw new AppError(400, "Bad Request", "Create Task Error Lacking Name or Des")
  }

  const info = {
    content: content,
    task: taskId,
  };
    const created = await Comment.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create task Success"
    );
  } catch (err) {
    next(err);
  }
};

//get by id
commentController.getCommentByTaskId = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
      const commentFound = await Comment.find({ task: id , isDeleted: false});
      sendResponse(
        res,
        200,
        true,
        { data: commentFound },
        null,
        "Find task Success"
      );
    } catch (err) {
      next(err);
    }
};

//Delete task
commentController.deleteCommentById = async (req, res, next) => {
    //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication
  
    // empty target mean delete nothing
    const {id}=req.params;
    
    //options allow you to modify query. e.g new true return lastest update of data
    const options = { new: true };
    try {
      //mongoose query
      const updated = await Comment.findByIdAndUpdate(id, {isDeleted: true});
  
      sendResponse(res, 200, true, { data: updated }, null, "Delete comment success");
    } catch (err) {
      next(err);
    }
  };

//update task detail

//export
module.exports = commentController;
