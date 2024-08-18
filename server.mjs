import express from "express";
import dotenv from "dotenv";
import contactRouter from './routes/contactRoutes.mjs'
import errorHandler from "./middleware/errorHandler.mjs";
import connectDb from "./config/dbConnection.mjs";
import userRouter from "./routes/userRoutes.mjs";

dotenv.config();

connectDb()
const app = express();

const port = process.env.PORT || 5000;

// app.get('/api/contacts', (req,res)=>{
//     res.status(201).send({
//         'data':[1,2,3,4,5]
//     })
//     // res.json({
//     //     'data':[{1:'one'},2,3,4,5]
//     // })
// })

// we are use this middleware for for parsing the data from the client side
app.use(express.json())

app.use("/api/contacts", contactRouter)    //we put /api/contacts because this will be common in all the apis

app.use("/api/user", userRouter)

// this is the custom middleware
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`App is listen on the port ${port}`);
}) 