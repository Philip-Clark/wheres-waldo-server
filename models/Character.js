const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CharacterSchema = new Schema({
  name: String,
  position: { x: Number, y: Number },
  image: String,
} );



module.exports = mongoose.model('Character', CharacterSchema);
