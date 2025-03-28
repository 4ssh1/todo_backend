const express = require("express")
const todoRouter = express.Router()
const {newTodo, getTodo, updateTodo, deleteTodo} = require('../controller/todoController')

todoRouter.post('/add', newTodo)
      .get('/find-todo/:id', getTodo)
      .patch('/update-todo/:id', updateTodo)
      .delete('/delete-todo/:id', deleteTodo)



 
module.exports = {todoRouter}