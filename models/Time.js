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
});

TimeSchema.virtual('duration').get(function () {
  return this.end - this.start;
});

module.exports = mongoose.model('Time', TimeSchema);
