const mongoose = require('mongoose');

const lessonProgressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
  first: { type: Boolean, default: false },
  review1: { type: Boolean, default: false },
  review2: { type: Boolean, default: false },
  retention: { type: Boolean, default: false },
  final: { type: Boolean, default: false }
}, { timestamps: true });

// Ensure unique progress per user per lesson
lessonProgressSchema.index({ user: 1, lesson: 1 }, { unique: true });

module.exports = mongoose.model('LessonProgress', lessonProgressSchema);
