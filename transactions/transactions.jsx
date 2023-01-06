const express = require("express");
const mongoose = require("mongoose");
const Customer = require("../models/customer.jsx")
const Order = require("../models/order.jsx");
const Product = require("../models/product.jsx");

const router = express.Router();
let product_num = 500;
productId = "PRD"+product_num;
router.get("/home",(req,res)=>{
    res.send("i am from transactions")
})

router.post("/orders",async(req,res)=>{
    try{
    console.log(req.body)
   const {customer_id,product_id,product_name,quantity} = req.body;
   if(!customer_id || !product_id || !product_name || !quantity){
    return res.status(400).json({
        status:"failed",
        message:"please enter all feilds"
    })
   }

   const idproducts = await Product.findOne({product_id})
//    console.log(idproducts.available_quantity)
   if(idproducts.available_quantity - quantity < 0){
    return res.json({
        message : "out of stock"
    })
   }
   idproducts.available_quantity = idproducts.available_quantity - quantity;


   const idcustomers = await Customer.findOne({customer_id})
   const total_cost = quantity * idproducts.product_price;
   console.log(idcustomers.balance,total_cost,quantity,idproducts.product_price)
   if(idcustomers.balance - total_cost < 0){
    return res.json({
        message : "insufficient funds"
    })
   }
   idcustomers.balance = idcustomers.balance - total_cost;

   const order = await Order.create({
    customer_id,
    product_id,
    product_name,
    quantity
   })

   res.json({
    order
   })
}catch(err){
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}
})


router.post("/product",async(req,res)=>{
    try{
    // console.log(req.body)
   const { product_id,
    product_type,
    product_name,
    product_price,
    available_quantity} = req.body;
   if(!product_type || !product_name || !product_price || !available_quantity){
    return res.status(400).json({
        status:"failed",
        message:"please enter all feilds"
    })
   }
   const idproduct = await Product.findOne().sort({product_id:-1})
//    console.log(idproduct.product_id)
   let Idproduct = idproduct.product_id.split("D")[1];
   console.log(Idproduct)
   Idproduct++;
   console.log(Idproduct)
   const product = await Product.create({
    product_id:"PRD" + Idproduct,
    product_type,
    product_name,
    product_price,
    available_quantity
   })
   product_num++;
   res.json({
    product
   })
}catch(err){
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}
})


router.post("/customer",async(req,res)=>{
    try{
    console.log(req.body)
   const {  customer_id,
    customer_name,
    email,
    balance,} = req.body;
   if(!customer_name || !email || !balance){
    return res.status(400).json({
        status:"failed",
        message:"please enter all feilds"
    })
   }
   const idcustomer = await Customer.findOne().sort({customer_id:-1})
    //   console.log(idcustomer)
      let Idcustomer = idcustomer.customer_id.split("T")[1];
    //   console.log(Idcustomer)
      Idcustomer++;
    //   console.log(Idcustomer)

   const customer = await Customer.create({
    customer_id:"CT"+Idcustomer,
    customer_name,
    email,
    balance,
   })
   res.json({
    customer
   })
}catch(err){
    return res.status(400).json({
        status:"failed",
        message:err.message
    })
}
})


router.get("/orders/product_id", async(req,res)=>{
    const order = await Order.findOne({product_id})
    res.json({
        order
    })
})


router.get("/orders/customer_id", async(req,res)=>{
    const order = await Order.findOne({customer_id})
    res.json({
        order
    })
})

module.exports = router;
