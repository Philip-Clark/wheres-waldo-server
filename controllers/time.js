const Time = require('../models/Time');

exports.getTime = async function (req, res) {
  const times = await Time.findOne({ sessionId: req.params.sessionId });
  res.json(times);
};

exports.start = async function (req, res) {
  const sessionId = req.params.sessionId;
  let time = await Time.findOne({ sessionId });
  if (!time) time = new Time({ sessionId });
  time.start = Date.now();
  await time.save().catch((err) => {
    return res.json({ status: 'Error starting time', msg: err.message });
  });
  return res.json({ message: 'time Started' });
};

exports.end = async function (req, res) {
  const sessionId = req.params.sessionId;
  const time = await Time.findOne({ sessionId });
  if (!time) return res.json('Session not found');
  time.end = Date.now();
  time.duration = time.end - time.start;
  await time.save().catch((err) => {
    return res.json({ status: 'Error ending time', msg: err.message });
  });
  res.json({ message: 'time Ended', duration: time.duration });
};

exports.saveTime = async function (req, res) {
  if (!req.params.name) return res.json('Name is required');
  const sessionId = req.params.sessionId;
  const name = req.params.name;
  const puzzleId = req.params.puzzleId;
  const time = await Time.findOne({ sessionId });

  if (!time) return res.json('Session not found');
  time.shouldSave = true;
  time.name = name;
  time.puzzleId = puzzleId;
  await time.save().catch((err) => {
    return res.json({ status: 'Error saving time', msg: err.message });
  });
  res.json({ message: 'Time saved', duration: time.duration, name: time.name });
};

exports.getTopTimes = async function (req, res) {
  const id = req.params.puzzleID;
  const top15 = await Time.find({ puzzleId: id, shouldSave: true }).sort({ duration: 1 }).limit(15);

  res.json({ message: 'Top times', topTimes: top15 });
};
