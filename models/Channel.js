const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  channelUrl: { type: String },
  playlistName: { type: String },
  playlistUrl: { type: String },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Channel', channelSchema);
