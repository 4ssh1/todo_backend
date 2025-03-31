const User = require('../model/userModel');
const generateToken = require('../middleware/generateToken')
const jwt = require('jsonwebtoken')

const signInUser = async (req, res) => {
    const {name, email, password} = req.body;

    const user = new User({
        name,
        email,
        password
    })

    const _user = await user.save()

    if(!user || !_user){
        return res.status(500).json({
            status: "Error",
            message: "User not registered"
        })
    }

    const token = generateToken(user._id, email)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expiresIn: 24 * 60 * 60 * 1000,
    }).status(201).json({
        status: "Successful",
        message: "User signed in successfully",
        token,
        user: user._id
    })
}

const logInUser = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    
    if(!user){
        return res.status(404).json({
            status: "Error",
            message: "User not found"
        })
    }
    const passwordCheck = await user.isValidPassword(password)
    
    if(!passwordCheck){
        return res.status(404).json({
            status: "Error",
            message: "Invalid email or password"
        })
    }

    const token = generateToken(user._id, email)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expiresIn: 24 * 60 * 60 * 1000,
        sameSite: "lax"

    }).status(201).json({
        status: "Successful",
        message: "User logged in successfully",
        token,
        user: user._id
    })

    

}

const logOutUser =  (req, res) => {
    
    const _token = req.cookies.token

    if (!_token ) {
        return res.status(401).json({ message: "No token" });
    }

    const decoded =  jwt.verify(_token, process.env.JWT_SECRET);
    if(!decoded) return res.status(401).json({ message: "No user is logged in" });

    console.log(`User ${decoded.id} is logging out`); 

    res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" });

    res.status(201).json({
        status: "successful",
        message: `User ${decoded.id} logged out successfully`    
        
    })
    
}

module.exports = {signInUser, logInUser, logOutUser}