const { sendResponse, AppError } = require("../helpers/utils.js");

const User = require("../models/User.js");
const Task = require("../models/Task.js");
const Board = require("../models/Board.js");
const bcrypt = require('bcrypt');

const userController = {};
//create
userController.createUser = async (req, res, next) => {
  //in real project you will getting info from req

  try {
    const { name, email, password, avatar, role } = req.body;
    if (!name) throw new AppError(402, "Bad Request", "Missing data Error");
    const info = {
      name: name,
      email: email,
      password: password,
      avatar: avatar,
      role: "user"
    };
    const userCheck = await User.find({email: email});
    if (userCheck) throw new AppError(402, "Bad request", "Email is duplicate")
    //always remember to control your inputs
    //mongoose query
    const created = await User.create(info);
    sendResponse(
      res,
      200,
      true,
      { data: created },
      null,
      "Create user Success"
    );
  } catch (err) {
    next(err);
  }
};
//get by id
userController.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing id Error");
    const userFound = await User.findById(id);
    sendResponse(
      res,
      200,
      true,
      { data: userFound },
      null,
      "Find user Success"
    );
  } catch (err) {
    next(err);
  }
};
//get user by email
userController.getUserByEmail = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) throw new AppError(402, "Bad Request", "Missing name Error");
    const userFound = await User.find({ email: name });
    sendResponse(
      res,
      200,
      true,
      { data: userFound },
      null,
      "Find user by name Success"
    );
  } catch (err) {
    next(err);
  }
};

//get user by filter
userController.getUserByFilter = async (req, res, next) => {
    try {
        const { name } = req.query;
        let filter = {};
        if (name) filter = { name: { $regex: ".*" + name + ".*" } };
        console.log(name)
        const usersFound = await User.find(filter);
        sendResponse(
          res,
          200,
          true,
          { data: usersFound },
          null,
          "Find user by filter Success"
        );
    } catch (err) {
        next(err);
    }
 
};
//get user task
userController.getUserTask = async (req, res, next) => {
    try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing user id Error");
    const userFound = await User.findById(id);
    if(!userFound){
        throw new AppError(404, "Not Found", "User not found");
    }
  
    // console.log(userFound._id)
    const userTasks = await Task.find({ users: userFound._id });
    sendResponse(
        res,
        200,
        true,
        { data: userTasks },
        null,
        "Find user task Success"
      );
    } catch (err) {
        next(err)
    }
};

//get user board
userController.getUserBoard = async (req, res, next) => {
    try {
    const { id } = req.params;
    if (!id) throw new AppError(402, "Bad Request", "Missing user id Error");
    const userFound = await User.findById(id);
    if(!userFound){
        throw new AppError(404, "Not Found", "User not found");
    }
  
    // console.log(userFound._id)
    const userBoard = await Board.find({ users: userFound._id }).populate('users');
    sendResponse(
        res,
        200,
        true,
        { boards: userBoard },
        null,
        "Find user task Success"
      );
    } catch (err) {
        next(err)
    }
   

};
userController.register = async (req, res, next) => {
  try {
    // Get data from request
    const { name, email, password } = req.body;

    // Business Logic Validation
    let user = await User.findOne({ email });
    if (user) {
      throw new AppError(400, "User already exists", "Registration Error");
    }

    // Process
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    user = await User.create({ name, email, password: hashedPassword });
    const accessToken= await user.generateToken();
    // Response
    sendResponse(res, 200, true, { user, accessToken }, null, "Create User successful");
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
};

userController.loginWithEmail = async (req, res, next) => {
  try {
    // Get data from request
    const { email, password } = req.body;

    // Business Logic Validation
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw new AppError(400, "Invalid Credentials", "Login Error");

    // Process
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError(400, "Wrong password", "Login Error");

    const accessToken = await user.generateToken();

    // Response
    sendResponse(res, 200, true, { user, accessToken }, null, "Login successful");
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

//export
module.exports = userController;
