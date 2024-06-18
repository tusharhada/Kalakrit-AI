import express from 'express'
import {getTokenCount, getTranslatedOutput} from '../controllers/translate.js';

const router = express.Router()

router.post('/token', getTokenCount);
router.post('/translate', getTranslatedOutput); 

export default router;
