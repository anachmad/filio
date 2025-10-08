import express from 'express';
import authMiddleware from '../../middleware/auth.middleware.js';
import * as childController from './child.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', childController.createChild);
router.get('/', childController.getChildren);

export default router;