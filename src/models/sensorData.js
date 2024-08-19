import mongoose from 'mongoose';

const SensorDataSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.SensorData || mongoose.model('SensorData', SensorDataSchema);
