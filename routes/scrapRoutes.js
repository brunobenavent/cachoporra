import express from 'express'
import { consultarWebScraping } from '../controllers/scrapControllers.js'


const router = express.Router();

router.get('/:jornada', consultarWebScraping);


export default router;
