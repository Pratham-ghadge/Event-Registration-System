import Event from '../models/Event.js';
import Registration from '../models/Registration.js';

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'name email').sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('createdBy', 'name email');
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = req.file.path;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      return res.status(400).json({ message: 'Please provide an image' });
    }

    const event = new Event({
      title,
      description,
      date,
      location,
      imageUrl,
      createdBy: req.user._id,
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this event' });
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;

    if (req.file) {
      event.imageUrl = req.file.path;
    } else if (req.body.imageUrl) {
      event.imageUrl = req.body.imageUrl;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    // Also delete associated registrations
    await Registration.deleteMany({ eventId: req.params.id });

    res.json({ message: 'Event removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register for an event
// @route   POST /api/events/:id/register
// @access  Private
export const registerForEvent = async (req, res) => {
  try {
    const { tickets } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already registered
    const existingRegistration = await Registration.findOne({
      eventId: req.params.id,
      userId: req.user._id
    });

    if (existingRegistration) {
      return res.status(400).json({ message: 'You have already registered for this event' });
    }

    const registration = new Registration({
      eventId: req.params.id,
      userId: req.user._id,
      tickets: tickets || 1
    });

    const createdRegistration = await registration.save();
    res.status(201).json(createdRegistration);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get registrations for an event
// @route   GET /api/events/:id/registrations
// @access  Private
export const getEventRegistrations = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to view registrations' });
    }

    const registrations = await Registration.find({ eventId: req.params.id }).populate('userId', 'name email');
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
