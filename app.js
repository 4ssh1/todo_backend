require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookie = require('cookie-parser')
const app = express();
app.use(cookie())

const {todoRouter} = require('./routes/todoRoutes')
const {userRouter} = require('./routes/userRoute')
const quoteslib = require("./quotes");
const quoteFunc = quoteslib.getRandomQuotes;

const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE)
        .then(()=>console.log("DB connection is successful"))
        .catch((err)=>console.log("DB error: ", err))

app.use(cors({
    origin: "https://todo-list-hgia.vercel.app",
    credentials: true
}));

// Handle preflight requests for all routes

app.options("*", cors({
    origin: "https://todo-list-hgia.vercel.app",
    credentials: true
  }));
  
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/todo', todoRouter)
app.use('/user', userRouter)

app.get("/", (req, res) => {
    res.send("Server is up and running ");
});
app.get("/quotes", (req,res)=>{
    res.status(200).json({
        quote: quoteFunc()
    })
})

  


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})