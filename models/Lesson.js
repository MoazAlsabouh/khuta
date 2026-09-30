const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lesson: { type: String, required: true },
  subject: { type: String, required: true },
  unit: { type: String, default: 'دروس بدون وحدة' },
  page: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
