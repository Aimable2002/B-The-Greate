import express from 'express'
import { getSeries } from '../Controller/uploadSerie.js'
import multer from 'multer';
import { uploadChanges } from '../Controller/seriesController.js';
import { addSeries } from '../Controller/uploadSerie.js';

const router = express.Router()

const upload = multer();

router.get('/', getSeries)
router.post('/changes', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadChanges)
router.post('/add', upload.none(), addSeries)

export default router