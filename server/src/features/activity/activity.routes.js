import express from 'express';
import * as activityController from './activity.controller.js';
import authMiddleware from '../../middleware/auth.middleware.js';

const router = express.Router();

router.use(authMiddleware);

// Routes for activity
router.post('/', activityController.createActivity);
router.get('/child/:childId', activityController.getActivitiesByChildId);
// router.get('/:id', activityController.getActivityById);
// router.put('/:id', activityController.updateActivity);
// router.delete('/:id', activityController.deleteActivity);

export default router;