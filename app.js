require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const {todoRouter} = require('./routes/todoRoutes')
const quoteslib = require("./quotes");
const quoteFunc = quoteslib.getRandomQuotes;

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DATABASE)
        .then(()=>console.log("DB connection is successful"))
        .catch((err)=>console.log("DB error: ", err))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/todo', todoRouter)

app.get("/quotes", (req,res)=>{
    res.status(200).json({
        quote: quoteFunc()
    })
})



app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})