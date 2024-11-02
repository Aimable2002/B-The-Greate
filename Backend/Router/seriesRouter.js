import express from 'express'
import { getSeries } from '../Controller/uploadSerie.js'
import multer from 'multer';
import { uploadChanges } from '../Controller/seriesController.js';

const router = express.Router()

const upload = multer();

router.get('/', getSeries)
router.post('/changes', upload.fields([{ name: 'image1' }, { name: 'image2' }]), uploadChanges)

export default router