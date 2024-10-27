import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import path from 'path'
import connectDB from "./connectDb/connectDB.js";
import connectCloud from "./Cloudinary/connectCloud.js";


const app = express()

const __dirname = path.resolve()

dotenv.config()

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use(express.static(path.join(__dirname, "Frontent/dist")))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})



app.listen(PORT, () => {
    connectDB()
    connectCloud()
    console.log(`Server running on Port: ${PORT}`)
})