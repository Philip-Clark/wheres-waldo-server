const Puzzle = require('../models/Puzzle');
require('dotenv').config();
const url = process.env.SERVER_URL;

exports.getCharacterNames = async function (req, res) {
  const puzzleId = req.params.id;
  const puzzle = await Puzzle.findById(puzzleId).populate('characters');
  if (!puzzle) return res.json('Puzzle not found');
  const characterNames = puzzle.characters.map((character) => character.name);
  res.json(characterNames);
};

exports.getPuzzles = async function (req, res) {
  const puzzles = await Puzzle.find({}).populate('characters', 'name image -_id');
  if (puzzles.length === 0) return res.json('No puzzles found');
  puzzles.forEach((puzzle) => {
    puzzle.characters.forEach((character) => {
      character.image = url + character.image;
    });
  });
  res.json(puzzles);
};

exports.getImageSize = async function (req, res) {
  const puzzleId = req.params.id;
  const puzzle = await Puzzle.findById(puzzleId);
  if (!puzzle) return res.json('Puzzle not found');
  const { width, height } = puzzle.originalImageSize;
  res.json({ width, height });
};

exports.getImageURL = async function (req, res) {
  const puzzleId = req.params.id;
  const puzzle = await Puzzle.findById(puzzleId);
  if (!puzzle) return res.json('Puzzle not found');
  res.json(url + puzzle.imageURL);
};
