var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).send("Welcome to MinitaskManagement");
});
const userRouter = require("./user.api.js")
router.use("/users",userRouter)
const taskRouter = require("./task.api.js")
router.use("/tasks",taskRouter)
const boardRouter = require("./board.api.js")
router.use("/boards",boardRouter)
const commentRouter = require("./comment.api.js")
router.use("/comments",commentRouter)
module.exports = router;
