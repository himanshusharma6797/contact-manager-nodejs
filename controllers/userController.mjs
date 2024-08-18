import asyncHandler from "express-async-handler"
import User from "../models/userModel.mjs";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


// @desc User Signup 
// @route api/user/signup
// @access public
const userSignup = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("Email already taken")
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10)
    console.log('hashPassword', hashPassword);

    const userCreting = await User.create({
        username,
        email,
        password: hashPassword
    })
    if (userCreting) {
        res.status(201).json({
            _id: userCreting.id,
            email: userCreting.email,
            message: "User created successfully"
        })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
})

// @desc User Login 
// @route api/user/login
// @access public
const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                },
            }, process.env.ACCESS_TOKEN_KEY,
            {
                expiresIn:'10h'
                // expiresIn:'1m'
            }
        )
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("Email or Password is not valid")
    }
})

// @desc Current User 
// @route api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

const UserController = {
    userSignup,
    userLogin,
    currentUser
}

export default UserController