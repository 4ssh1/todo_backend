const User = require('../model/userModel');
const bcrypt = require('bcrypt')

const signInUser = async (req, res, next) => {
    const {name, email, password, createdAt} = req.body;

    const user = new User({
        name,
        email,
        password,
    })

    const _user = await user.save()

    if(!user || !_user){
        return res.status(500).json({
            status: "Error",
            message: "User not registered"
        })
    }

    res.status(201).json({
        status: "Successful",
        message: "User signed in successfully"
    })

    next()
}

const logInUser = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    const passwordCheck = await user.isValidPassword(password)

    if(!user){
        return res.status(404).json({
            status: "Error",
            message: "User not found"
        })
    }

    if(!passwordCheck){
        return res.status(404).json({
            status: "Error",
            message: "Invalid email or password"
        })
    }

    res.status(201).json({
        status: "Successful",
        message: "User logged in successfully"
    })
    next()
}

module.exports = {signInUser, logInUser}