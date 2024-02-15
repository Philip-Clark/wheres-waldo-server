const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Character = require('./Character');

const PuzzleSchema = new Schema({
  name: String,
  imageURL: String,
  originalImageSize: { width: Number, height: Number },
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
});

module.exports = mongoose.model('Puzzle', PuzzleSchema);
