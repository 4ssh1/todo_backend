const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    todos: {
        type: String,
        required: true
    }
})


module.exports = mongoose.model("Todo", TodoSchema)