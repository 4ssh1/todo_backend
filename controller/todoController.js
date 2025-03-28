const Todo = require("./model/todoModel")

const newTodo = async(req, res, next)=>{
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

    res.status(201).json({
        status: "successful",
        message: "Todo was created successfully",
        _todo
    })
    next()
}

const getTodo = async (req, res, next) => {
    const {id} = req.params; //make a user id with mongoose
    const _todo = await Todo.findById(id)

    if(!id || !_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not found"
        })
    }
    
    res.status(201).json({
        status: "Successful",
        message: "Todo found successfully",
        _todo
    })
    next()
}

const updateTodo = async (req, res, next) => {
    const {id} = req.params;
    const {todo} = req.body;

    const _todo = await Todo.findByIdAndUpdate(id, todo, {new: true})

    if(!id || !todo || !_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not updated successfully"
        })
    }

    res.status(201).json({
        status: "Successful",
        message: "Todo updated successfully",
        _todo
    })
    next()
}

const deleteTodo = async (req, res, next) => {
    const {id} = req.params;
    const {todo} = req.body;

    const _todo = Todo.findByIdAndDelete(id)

    if(!id || !todo || !_todo){
        return res.status(404).json({
            status: "error",
            message: "Todo not deleted successfully"
        })
    }

    res.status(200).json({
        status: "Successful",
        message: "Todo deleted successfully"
    })
    next()
}

module.exports = {newTodo, getTodo, updateTodo, deleteTodo}