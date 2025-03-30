const jwt = require("jsonwebtoken");

const generateToken = (userId, userEmail) => {
    return jwt.sign({ id: userId, email:userEmail }, process.env.JWT_SECRET , {
        expiresIn: "1d" // Token expires in 1 day
    });
};

module.exports = generateToken;
