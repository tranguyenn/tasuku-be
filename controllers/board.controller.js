const { sendResponse, AppError } = require("../helpers/utils.js");
const Board = require("../models/Board.js");

const Task = require("../models/Task.js");
const User = require("../models/User.js");
const { use } = require("../routes/board.api.js");

const boardController = {};
//Create a task
boardController.createBoard = async (req, res, next) => {
  //in real project you will getting info from req
  try {
  const { name, description,cover, creator } = req.body;
  if(!name||!description){
    throw new AppError(400, "Bad Request", "Create Task Error Lacking Name or Des")
  }

  const info = {
    name: name,
    description: description,
    cover: cover,
    creator: creator,
    users:[creator]
  };
  console.log(info);
    const created = await Board.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create board Success"
    );
  } catch (err) {
    next(err);
  }
};

//assign to task name
boardController.addMemberToBoard = async (req, res, next) => {
  //in real project you will getting info from req
  try {
    const { boardId,email } = req.body;
    console.log("req", req.body);
    if(!boardId|| !email){
      throw new AppError(400, "Bad Request", "Update Task Error null id");
    }
    //always remember to control your inputs
    //in real project you must also check if id (referenceTo) is valid as well as if document with given id is exist before any futher process
    let found = await Board.findOne({ _id: boardId, isDeleted: false });
    //add your check to control if task is notfound
    let user = await User.findOne({email: email});
    //add your check to control if foo is notfound
    if (!found||!user) {
      throw new AppError(404, "Not Found", "Task and users Error not found");
    }
    
    if(found.users.includes(user._id)){
      throw new AppError(404, "Not Found", "users already in the list");
    }
    if(user.boards.includes(found._id)){
      throw new AppError(404, "Not Found", "board already in the list");
    }
    found.users.push(user._id);
    user.boards.push(found._id);
    //mongoose query
    found = await found.save();
    user = await user.save();
    sendResponse(
      res,
      200,
      true,
      { data: found },
      null,
      "Add reference success"
    );
  } catch (err) {
    next(err);
  }
};

//get by id
boardController.getBoardById = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
      const boardFound = await Board.findOne({ _id: id, isDeleted: false }).populate(['users','creator']);
      console.log("id",id);
      sendResponse(
        res,
        200,
        true,
        { boardFound },
        null,
        "Find task Success"
      );
    } catch (err) {
      next(err);
    }
};


//update task detail

//export
module.exports = boardController;
