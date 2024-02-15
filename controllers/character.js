const Character = require('../models/Character');
const Puzzle = require('../models/Puzzle');

exports.guessCharacter = async function (req, res) {
  const puzzleId = req.params.id;
  const { name, rect } = req.body;

  const puzzle = await Puzzle.findById(puzzleId).populate('characters');
  if (!puzzle) return res.json('Puzzle not found');

  const match = puzzle.characters.find(
    (character) => character.name.toLowerCase() === name.toLowerCase()
  );

  if (!match) return res.json('Character name not found in puzzle');

  const { x, y } = match.position;
  const characterPositionInsideRect =
    rect.top < y && rect.bottom > y && rect.left < x && rect.right > x;
  if (!characterPositionInsideRect)
    return res.json({ msg: 'Character not found in rect', value: false });

  res.json({ msg: 'Character found in rect', value: true });
};

exports.addCharacter = function (req, res) {
  const { name, position } = req.body;
  const character = new Character({ name, position });
  character.save((err, character) => {
    if (err) res.json('Error adding character');
    res.json('Character added');
  });
};
