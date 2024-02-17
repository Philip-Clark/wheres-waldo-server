const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
  },
  sessionId: {
    type: String,
    required: true,
  },
  shouldSave: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

module.exports = mongoose.model('Time', TimeSchema);
