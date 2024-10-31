const express= require("express")
const { getUserByEmail, getUserById, getUserTask, getUserBoard, createUser, register, loginWithEmail } = require("../controllers/user.controller")
const router = express.Router()

//done
/**
 * @route GET api/users/search
 * @description Get a list of users
 * @access private
 * @allowedQueries: email
 */
router.get("/search",getUserByEmail)


/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
router.get("/:id",getUserById)



/**
 * @route GET api/users/:id/tasks
 * @description Get all task by userId
 * @access public
 */
router.get("/:id/tasks",getUserTask)

/**
 * @route GET api/users/:id/boards
 * @description Get all boards by userId
 * @access public
 */
router.get("/:id/boards",getUserBoard)


/**
 * @route POST api/users
 * @description Create a new user register
 * @access private, manager, employee
 * @requiredBody: name 
 */
// router.post("/",createUser)
/**
 * @route POST api/users
 * @description Create a new user register
 * @access private, manager, employee
 * @requiredBody: name 
 */
router.post("/",register)

/**
 * @route POST api/users
 * @description Login
 * @access private manager, employee
 * @requiredBody: name 
 */
 router.post("/login",loginWithEmail)

//export
module.exports= router
//Update