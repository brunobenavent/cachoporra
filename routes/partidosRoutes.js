import express from 'express'

import { resultadosControllers} from '../controllers/partidosControllers.js'

const router = express.Router();

router.get( '/partidos', resultadosControllers );



export default router;
