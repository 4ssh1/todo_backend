const express = require('express');
const userRouter = express.Router()
const { logInUser, signInUser, logOutUser, getProfile } = require('../controller/userController');
const protect = require('../middleware/protect')

userRouter.post('/login', logInUser)
          .post('/signin', signInUser)
          .post('/logout', logOutUser)
          .get("/profile", protect, getProfile) 


  

module.exports = {userRouter}