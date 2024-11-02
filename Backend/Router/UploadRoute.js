import express from "express";
import { uploadImage } from "../Controller/uploadImage.js";
import multer from 'multer';
import { uploadSerie } from "../Controller/uploadSerie.js";
import { editChanges } from "../Controller/uploadSerie.js";
import { deleteMovie } from "../Controller/uploadSerie.js";

const router = express.Router()

const upload = multer();
// router.post('/',  uploadImage)

router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadImage);
router.post('/series', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadSerie)
router.post('/changes', upload.fields([{ name: 'image1' }, { name: 'image2' }]), editChanges)
router.post('/delete', deleteMovie)


export default router