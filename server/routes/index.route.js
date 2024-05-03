const router = require("express").Router()
const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const { authorizeUser } = require("../service/authentaction")
const jwt = require("jsonwebtoken")

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Email is already taken.
 */
router.post("/register", asyncHandler(async (req, res) => {
  const existUser = await User.findOne({ email: req.body.email })

  if (existUser) {
    return res.status(409).send({ message: "Email is already taken !!" })
  }

  let newUser = new User(req.body)
  await newUser.save()
  res.status(201).send({ message: "Account Created !!" })
}))

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login user
 *     description: Logs in a user with the provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *       400:
 *         description: Invalid email or password.
 */

router.post("/login", asyncHandler(async (req, res) => {
  const data = req.body
  let user = await User.findOne({ email: data.email })

  if (!user) {
    return res.status(400).send({ message: "Invalid Email " })
  }

  let validPass = await user.comparePassword(data.password)
  if (!validPass) {
    return res.status(400).send({ message: "Invalid password" })
  }

  let token = generateToken(user._id)
  const cookiesOptions = {
    expires: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: true
  }
  res.cookie("access-token", `Barear ${token}`, cookiesOptions)
  res.send({ token })
}))

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the currently authenticated user.
 *     responses:
 *       200:
 *         description: User successfully logged out.
 */
router.post("/logout", asyncHandler(async (req, res) => {
  res.cookie("access-token", "")
  res.send()
}))

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user information
 *     description: Retrieves information about the currently authenticated user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *       401:
 *         description: Unauthorized - user not authenticated.
 */
router.get("/user", authorizeUser, asyncHandler((req, res) => {
  res.send(req.user)
}))

const generateToken = (payload) => {
  return jwt.sign({ id: payload }, "Seceret_key", {
    expiresIn: "7d"
  })
}

module.exports = router