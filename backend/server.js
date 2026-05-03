import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Routes
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventhub')
  .then(async () => {
    console.log('MongoDB connected');
    
    // Drop stale indexes that cause E11000 duplicate key errors
    try {
      const db = mongoose.connection.db;
      
      const regCollection = db.collection('registrations');
      const regIndexes = await regCollection.indexes();
      const staleRegIndexes = ['registrationId_1', 'ticketCode_1'];
      for (const idx of regIndexes) {
        if (staleRegIndexes.includes(idx.name)) {
          await regCollection.dropIndex(idx.name);
          console.log(`Dropped stale index: registrations.${idx.name}`);
        }
      }

      const eventCollection = db.collection('events');
      const eventIndexes = await eventCollection.indexes();
      if (eventIndexes.find(idx => idx.name === 'slug_1')) {
        await eventCollection.dropIndex('slug_1');
        console.log('Dropped stale index: events.slug_1');
      }
    } catch (err) {
      // Indexes may not exist, that's fine
      console.log('Index cleanup done');
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Event Registration API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
