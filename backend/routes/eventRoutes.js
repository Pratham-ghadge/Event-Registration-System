import express from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
  getEventRegistrations
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, upload.single('image'), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, upload.single('image'), updateEvent)
  .delete(protect, deleteEvent);

router.post('/:id/register', protect, registerForEvent);
router.get('/:id/registrations', protect, getEventRegistrations);

export default router;
