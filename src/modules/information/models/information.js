import mongoose, { Schema } from 'mongoose';

const InformationSchema = new Schema({
  openId: String,
  username: String,
  message: String,
  createTime: Number,
  updateTime: Number,
});

export default mongoose.model('Information', InformationSchema, 'information');
