const express= require("express")
const { getUserByEmail, getUserById, getUserTask, getUserBoard, createUser, register, loginWithEmail, getCurrentUser } = require("../controllers/user.controller")
const authentication = require("../middlewares/authentication")
const validators = require("../middlewares/validators")
const validateId = require("../middlewares/validateId")
const { validateGetByEmail, validateUser, validateLogin } = require("../middlewares/validateUser")
const router = express.Router()

//done
/**
 * @route GET api/users/search
 * @description Get a list of users
 * @access private
 * @allowedQueries: email
 */
router.get("/search",validators.validate(validateGetByEmail),authentication.loginRequired,getUserByEmail)
//done
/**
 * @route GET api/users/search
 * @description Get a list of users
 * @access login required
 * @allowedQueries: email
 */
router.get("/me",authentication.loginRequired,getCurrentUser)


/**
 * @route GET api/users/:id
 * @description Get user by id
 * @access public
 */
router.get("/:id",validators.validate(validateId),authentication.loginRequired,getUserById)



/**
 * @route GET api/users/:id/tasks
 * @description Get all task by userId
 * @access login required
 */
router.get("/:id/tasks",validators.validate(validateId),authentication.loginRequired,getUserTask)

/**
 * @route GET api/users/:id/boards
 * @description Get all boards by userId
 * @access required
 */
router.get("/:id/boards",validators.validate(validateId),authentication.loginRequired,getUserBoard)


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
 * @access public
 * @requiredBody: name 
 */
router.post("/",validators.validate(validateUser),register)

/**
 * @route POST api/users
 * @description Login
 */
 router.post("/login",validators.validate(validateLogin),loginWithEmail)

//export
module.exports= router
//Update