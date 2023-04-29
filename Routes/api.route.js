const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const { UserModel } = require("../models/user.model")
const { RestaurantModel, Menu } = require("../models/restaurant.model")
const { OrderModel } = require("../models/order.model")



const apiRouter=express.Router()

apiRouter.get("/",(req,res)=>{
    res.send("all Good")
})

apiRouter.post("/register", async (req,res)=>{
    const {name,email,password,address}=req.body
    try {
       const user= await UserModel.find({email})
       if(user.length==0){
           bcrypt.hash(password,5,async (err,hash_password) => {
               if(err){
                  console.log(err)
               }else{
                  let user=new UserModel({name,email,password:hash_password,address})
                  await user.save()
                  res.status(201).send({"msg":"User Register Sucessfully"})
               }
          })
       }else{
           res.send({"msg":"Email id is already registered"})
       }   
    } catch (error) {
        console.log("Error while registering")
        res.send({"msg":error})
    }
})

apiRouter.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try {
       const user=await UserModel.find({email})
       if(user.length!=0){
           let hash_password=user[0].password
           bcrypt.compare(password,hash_password,(err,result)=>{
               if(result){
                    var token= jwt.sign({userID:user[0]._id},process.env.key)
                    res.status(201).send({"msg":"Login Successful",token})
               }else{
                  console.log(err)
                  res.send({"msg":"Wrong Credentials"})
               }
          })
       }else{
           res.send({"msg":"Wrong Credentials"})
       }
       
       
    } catch (error) {
       console.log("Error While Login")
       res.send({"msg":error})
    }
})

apiRouter.patch("/user/:id/reset",async (req,res)=>{
    let id=req.params.id
    let {password,newPassword}=req.body
    try {
        let user=await UserModel.findById({_id:id})
        let hash_password=user.password
        bcrypt.compare(password,hash_password,(result,err)=>{
            if(result){
                bcrypt.hash(newPassword,5,async (err,hashPwd)=>{
                    if(err){
                        console.log(err)
                    }else{
                        let updateUser= await UserModel.findByIdAndUpdate({_id:id},{password:hashPwd})
                        res.send("Password Updated")
                    }
                })
            }else{
                console.log(err)
                res.send("Wrong Current Password")
            }
        })
        
    } catch (error) {
        console.log("Error while Reseting the Password")
        res.send(error)
    }
})

apiRouter.get("/restaurants",async (req,res)=>{
    try {
        let restaurants= await RestaurantModel.find()
        res.status(200).send(restaurants)
        
    } catch (error) {
        console.log("Error while Getting restaurany Data")
        res.send(error)
    }
})

apiRouter.get("/restaurants/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let restaurant= await RestaurantModel.find({_id:id})
        res.status(200).send(restaurant)
        
    } catch (error) {
        console.log("Error while Getting restaurany Data")
        res.send(error)
    }
})

apiRouter.post("/restaurants",async (req,res)=>{
     let payload=req.body
     try {
        let restaurant=await RestaurantModel.insertMany(payload)
        res.send("Restaurant Added To Database")
        
     } catch (error) {
        console.log("Error While Adding restaurant to DB")
        res.send(error)
     }
})

apiRouter.get("/restaurants/:id/menu",async (req,res)=>{
    let id=req.params.id
    try {
        let restaurant=await RestaurantModel.find({_id:id})
        res.send(restaurant[0].menu)
        
    } catch (error) {
        console.log("Error while Getting restaurany Data")
        res.send(error)
    }
})

apiRouter.post("/restaurants/:id/menu",async (req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        let restaurant=await RestaurantModel.find({_id:id})
       restaurant[0].menu.push(payload)  
       let {_id,name,address,menu}=restaurant[0]
       console.log(menu)
       let updateRes=await RestaurantModel.findByIdAndUpdate({_id:id},{_id,name,address,menu})
       res.send("Menu added Sucessfully")
        
    } catch (error) {
        console.log(err)
        console.log("Error while Getting restaurany Data")
        res.send(error)
    }
})

apiRouter.delete("/restaurants/:resid/menu/:menuid",async (req,res)=>{
     let {resid,menuid}=req.params
     try {
        let restaurant=await RestaurantModel.find({_id:resid})
        res.send("Menu data deleted")
        
     } catch (error) {
        console.log(error)
     }
})

apiRouter.post("/orders",async(req,res)=>{
    try {
        let payload=req.body
        let order=await OrderModel.insertMany(payload)
        res.send("Order Sucessfully Placed")
    } catch (error) {
        console.log(error)
        res.send("error while Ordering")
        
    }
})

apiRouter.get("/orders",async (req,res)=>{
    try {
        let orderData= await OrderModel.find()
        res.send(orderData)
        
    } catch (error) {
        console.log(error)
    }
})

apiRouter.get("/orders/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let orderData= await OrderModel.find({_id:id})
        res.send(orderData)
        
    } catch (error) {
        console.log(error)
    }
})

apiRouter.patch("/orders/:id",async (req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        let orderData= await OrderModel.findByIdAndUpdate({_id:id},payload)
        res.send("orderData Update Secussfully")
        
    } catch (error) {
        console.log(error)
    }
})


module.exports={
    apiRouter
}