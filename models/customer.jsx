const express = require("express");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    customer_id:{type:String, required:true},
    customer_name:{type:String, required:true},
    email:{type:String, required:true},
    balance:{type:Number, required:true}
})

const customer = mongoose.model("Customer",customerSchema);

module.exports = customer;