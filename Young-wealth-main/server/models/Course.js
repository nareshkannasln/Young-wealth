
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  videoUrl: { type: String, required: true },
  duration: Number,
  order: Number
}, { _id: false });

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['school', 'college', 'employee'], required: true },
  level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  price: { type: Number, default: 0 },
  duration: Number,
  thumbnail: String,
  videos: [VideoSchema],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

CourseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;