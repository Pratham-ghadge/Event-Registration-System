import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Event'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tickets: {
    type: Number,
    required: true,
    default: 1
  }
}, { timestamps: true });

const Registration = mongoose.model('Registration', registrationSchema);
export default Registration;
