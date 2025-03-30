const express = require('express');
const userRouter = express.Router()
const { logInUser, signInUser, logOutUser } = require('../controller/userController');

userRouter.post('/login', logInUser)
          .post('/signin', signInUser)
          .post('/logout', logOutUser)

module.exports = {userRouter}