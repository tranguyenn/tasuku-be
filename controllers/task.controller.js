const { sendResponse, AppError } = require("../helpers/utils.js");
const { castAllTaskBoard } = require("../helpers/objectCastUtils.js");
const Board = require("../models/Board.js");

const Task = require("../models/Task.js");
const User = require("../models/User.js");

const taskController = {};

//Create a task
taskController.createTask = async (req, res, next) => {
  //in real project you will getting info from req
  try {
    console.log("create",req.body)
    const { name, description, cover, status, boardId } = req.body;

    if (!name || !description || !status || !boardId) {
      throw new AppError(
        400,
        "Bad Request",
        "Create Task Error Lacking Name or Des"
      );
    }

    const info = {
      name: name,
      description: description,
      status: status,
      cover: cover,
      board: boardId,
    };
    const created = await Task.create(info);
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

//assign to task name
taskController.addReference = async (req, res, next) => {
  //in real project you will getting info from req
  try {
    const { taskId, empId } = req.body;
    if (!taskId || !empId) {
      throw new AppError(400, "Bad Request", "Update Task Error null id");
    }
    let found = await Task.findOne({ _id: id, isDeleted: false });
    //add your check to control if task is notfound
    const user = await User.findById(empId);
    //add your check to control if foo is notfound
    found.users.push(user);
    //mongoose query
    found = await found.save();
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

//Get all task
taskController.getAllTasks = async (req, res, next) => {
  //in real project you will getting condition from from req then construct the filter object for query
  // empty filter mean get all
  try {
    console.log("get all");
    const allowedFilter = ["name", "status", "createdAt", "updatedAt"];
    let { ...filterQuery } = req.query;
    console.log("filterQuery", filterQuery);
    if (!filterQuery) {
      const filterKeys = Object.keys(filterQuery);
      console.log("filter", filterKeys);
      filterKeys?.forEach((key) => {
        if (!allowedFilter.includes(key)) {
          throw new AppError(400, "Bad Request", `Query ${key} is not allowed`);
        }
        if (!filterQuery[key]) delete filterQuery[key];
      });
    }

    const filter = filterQuery;
    //mongoose query
    const listOfFound = await Task.find(filter).populate("referenceTo");
    //this to query data from the reference and append to found result.
    sendResponse(
      res,
      200,
      true,
      { data: listOfFound },
      null,
      "Found list of tasks success"
    );
  } catch (err) {
    next(err);
  }
};

//get by id
taskController.getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
    const taskFound = await Task.findOne({
      _id: id,
      isDeleted: false,
    }).populate(["board", "users", "creator"]);
    sendResponse(
      res,
      200,
      true,
      { data: taskFound },
      null,
      "Find task Success"
    );
  } catch (err) {
    next(err);
  }
};

//get task by board id
taskController.getTaskByBoardId = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
    const taskFound = await Board.findOne({ _id: id, isDeleted: false });
    if (!taskFound) {
      throw new AppError(404, "Bad Request", "Invalid board id");
    }
    const taskAvailable = await Task.find({board: id, isDeleted: false });
    console.log("task",taskAvailable);
    result = castAllTaskBoard(taskAvailable);
    sendResponse(res, 200, true, { result }, null, "Find task Success");
  } catch (err) {
    next(err);
  }
};

//Delete task
taskController.deleteTaskById = async (req, res, next) => {
  //in real project you will getting id from req. For updating and deleting, it is recommended for you to use unique identifier such as _id to avoid duplication

  // empty target mean delete nothing
  const { id } = req.params;

  //options allow you to modify query. e.g new true return lastest update of data
  const options = { new: true };
  try {
    //mongoose query
    const updated = await Task.findByIdAndUpdate(id, { isDeleted: true });

    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "Delete task success"
    );
  } catch (err) {
    next(err);
  }
};

//update task detail
taskController.updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const { name, description, cover, status } = req.body;
    if (!id)
      throw new AppError(400, "Bad Request", "Update Task Error null id");
    const found = await Task.findOne({ _id: id, isDeleted: false });
    console.log(found);
    if (!found) throw new AppError(404, "Not Found", "Update Task Error");

    const info = {
      name: name ? name : found.name,
      description: description ? description : found.description,
      status: status ? status : found.status,
      cover: cover ? cover : found.cover,
    };
    //mongoose query
    const updated = await Task.findByIdAndUpdate(id, { $set: info });
    //   found = await found.save();
    console.log("find", info);
    sendResponse(
      res,
      200,
      true,
      { data: updated },
      null,
      "update task Success"
    );
  } catch (err) {
    next(err);
  }
};
//export
module.exports = taskController;
