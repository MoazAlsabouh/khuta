const mongoose = require('mongoose');

const weeklyTaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true },
  subject: { type: String, required: true },
  task: { type: String, required: true },
  time: { type: String },
  done: { type: Boolean, default: false },
  doneDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('WeeklyTask', weeklyTaskSchema);
