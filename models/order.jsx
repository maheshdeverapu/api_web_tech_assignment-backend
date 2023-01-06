const express = require("express");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer_id:{type:String, required:true},
    product_id:{type:String, required:true},
    product_name:{type:String, required:true},
    quantity:{type:Number, required:true}
})

const order = mongoose.model("Order",orderSchema);

module.exports = order;