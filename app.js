const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./transactions/transactions.jsx")
const {MONGOURLDB} = require("./keys");
const port = 3000;
mongoose.set('strictQuery', false);
mongoose.connect(MONGOURLDB,{useNewUrlParser:true,useUnifiedTopology:true}, ()=>{
    console.log("connected to database")
})
app.use(express.json());
app.get("/",(req,res)=>{
    res.json({
        status:"success",
        message:"succesfully done"
    })
})

app.use(router)

app.listen(port,()=>{console.log(`server is up at port number ${port}`)})