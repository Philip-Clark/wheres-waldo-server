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
  await time.save().catch((err) => res.json({ status: 'Error starting time', msg: err.message }));
  res.json('Time started');
};

exports.end = async function (req, res) {
  const sessionId = req.params.sessionId;
  const time = await Time.findOne({ sessionId });
  if (!time) return res.json('Session not found');
  time.end = Date.now();
  time.duration = time.end - time.start;
  await time.save().catch((err) => res.json({ status: 'Error ending time', msg: err.message }));
  res.json({ message: 'time Ended', duration: time.duration });
};

exports.saveTime = async function (req, res) {
  if (!req.params.name) return res.json('Name is required');
  const sessionId = req.params.sessionId;
  const name = req.params.name;
  const time = await Time.findOne({ sessionId });

  if (!time) return res.json('Session not found');
  time.shouldSave = true;
  time.name = name;
  await time.save().catch((err) => res.json({ status: 'Error saving time', msg: err.message }));
  const top5 = await Time.find({}).sort({ duration: 1 }).limit(5);
  const top5times = top5.map((time) => {
    return { name: time.name, duration: time.duration };
  });
  res.json({ message: 'Time saved', duration: time.duration, name: time.name, top5: top5times });
};
