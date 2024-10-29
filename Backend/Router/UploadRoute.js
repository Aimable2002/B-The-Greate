import express from "express";
import { uploadImage } from "../Controller/uploadImage.js";
import multer from 'multer';
const router = express.Router()

const upload = multer();
// router.post('/',  uploadImage)

router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadImage);


export default router