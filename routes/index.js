var express = require('express');
const { guessCharacter } = require('../controllers/character');
const {
  getCharacterNames,
  getImageSize,
  getImageURL,
  getPuzzles,
} = require('../controllers/puzzle');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/', function (req, res, next) {
  res.send('test');
});

router.post(`/puzzle/:id/guess/`, guessCharacter);

router.get('/puzzles', getPuzzles);

router.get('/puzzle/:id/characterNames', getCharacterNames);
router.get('/puzzle/:id/imageSize', getImageSize);
router.get('/puzzle/:id/imageURL', getImageURL);

module.exports = router;
