const express=require("express")
const mongoose=require("mongoose")
const { connection } = require("./config/db")
const { apiRouter } = require("./Routes/api.route")

require("dotenv").config()


const app=express()

app.use(express.json())
app.use("/api",apiRouter)



app.listen(process.env.port,async ()=>{
    try {
      await connection
      console.log("connected To DB")
        
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running on ${process.env.port}`)
})
