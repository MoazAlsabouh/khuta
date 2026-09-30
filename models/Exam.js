const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  at: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Exam', examSchema);
