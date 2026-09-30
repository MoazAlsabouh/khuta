const mongoose = require('mongoose');

const weeklyActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true }, // e.g. "الأسبوع 1"
  start: { type: String, required: true }, // ISO date YYYY-MM-DD
  end: { type: String, required: true },   // ISO date YYYY-MM-DD
  completed: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  percent: { type: Number, default: 0 },
  level: { type: String, default: 'لا نشاط' }
}, { timestamps: true });

module.exports = mongoose.model('WeeklyActivity', weeklyActivitySchema);
