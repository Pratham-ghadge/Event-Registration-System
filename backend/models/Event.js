import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date'],
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;

