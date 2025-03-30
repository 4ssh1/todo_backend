const User = require('../model/userModel')

const protect = async(req, res, next)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select(-password)  //what does this do ?

    if(!token) return res.status(404).json({
        status: "Error",
        message: "Not authorized"
    })

    if(!user) return res.status(404).json({
        status: "Error",
        message: "User not found"
    })

    res.json({
        status: "successful",
        message: "Authorized",
        user
    })
    next()
}

module.exports = protect