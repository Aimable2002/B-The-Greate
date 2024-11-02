import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from "body-parser";
import path from 'path'
import connectDB from "./connectDb/connectDB.js";
import connectCloud from "./Cloudinary/connectCloud.js";
import UploadRoute from './Router/UploadRoute.js'

import authRouter from './Router/authRauter.js'
import movieRouter from './Router/moviesRouter.js'
import seriesRouter from './Router/seriesRouter.js'


const app = express()

const __dirname = path.resolve()


dotenv.config()

const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(bodyParser.json())
app.use(cors())


app.use('/api/upload', UploadRoute)
app.use('/api/auth', authRouter)
app.use('/api/movies', movieRouter)
app.use('/api/series', seriesRouter)


app.use(express.static(path.join(__dirname, "Frontend", "dist")))

app.get('*', (req, res) => {
    console.log(`Request for: ${req.path}`);
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"))
})



app.listen(PORT, () => {
    connectDB()
    connectCloud()
    console.log(`Server running on Port: ${PORT}`)
})