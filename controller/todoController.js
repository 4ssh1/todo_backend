const Todo = require("../model/todoModel")

const newTodo = async(req, res)=>{
    const {todo, completed} = req.body;
    const _todo = await Todo.create({
        todo,
        completed
    })

    if(!_todo || !todo || !completed){
        return res.status(404).json({
            status: "failed",
            message: "Todo not created"
        })
    }

    return res.status(201).json({
        status: "successful",
        message: "Todo was created successfully"
    })
}

const getTodo = async (req, res) => {
    const {id} = req.params; 
    
    if(!id){
        return res.status(404).json({
            status: "error",
            message: "Id not found"
        })
    }
    const _todo = await Todo.findById(id)

    if(!_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not found",
        })
    }
    
    return res.status(201).json({
        status: "Successful",
        message: "Todo found successfully",
        _todo
    })
}

const updateTodo = async (req, res) => {
    const {id} = req.params;
    const {todo} = req.body;

    const _todo = await Todo.findByIdAndUpdate(id, {todo}, {new: true, runValidators: true})

    if(!id || !todo || !_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not updated successfully"
        })
    }

    return res.status(201).json({
        status: "Successful",
        message: "Todo updated successfully",
        todo
    })
}

const deleteTodo = async (req, res) => {
    const {id} = req.params;

    
    if(!id){
        return res.status(404).json({
            status: "error",
            message: "Todo not deleted successfully"
        })
    }
    const _todo = await Todo.findByIdAndDelete(id)

    if(!_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not deleted successfully"
        })
    }

    return res.status(200).json({
        status: "Successful",
        message: "Todo deleted successfully"
    })
}

module.exports = {newTodo, getTodo, updateTodo, deleteTodo}