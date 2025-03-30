const express = require("express")
const {newTodo, getTodo, updateTodo, deleteTodo} = require('../controller/todoController')
const protect = require('../middleware/protect')
const todoRouter = express.Router()

todoRouter.use(protect)
todoRouter.post('/add', newTodo)
      .get('/find-todo/:id', getTodo)
      .patch('/update-todo/:id', updateTodo)
      .delete('/delete-todo/:id', deleteTodo)



 
module.exports = {todoRouter}