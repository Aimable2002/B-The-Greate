import express from "express";
import { getMovies } from "../Controller/movieController.js";


const router = express.Router()

router.get('/', getMovies)


export default router