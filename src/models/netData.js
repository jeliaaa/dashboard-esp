import mongoose from 'mongoose';

const NetDataSchema = new mongoose.Schema({
  status: String,  // Fixed typo here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NetData || mongoose.model('NetData', NetDataSchema);
