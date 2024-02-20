var express = require('express');
const { guessCharacter } = require('../controllers/character');
const {
  getCharacterNames,
  getImageSize,
  getImageURL,
  getPuzzles,
  getPuzzle,
} = require('../controllers/puzzle');
const { getTime, start, end, save, saveTime, getTopTimes } = require('../controllers/time');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/', function (req, res, next) {
  res.send('test');
});

router.post(`/puzzle/:id/guess/`, guessCharacter);
router.get('/puzzle/:id', getPuzzle);

router.get('/puzzles', getPuzzles);

router.get('/puzzle/:id/characterNames', getCharacterNames);
router.get('/puzzle/:id/imageSize', getImageSize);
router.get('/puzzle/:id/imageURL', getImageURL);

router.get('/time/:sessionId', getTime);
router.post('/time/start/:sessionId', start);
router.post('/time/end/:sessionId', end);
router.post('/time/save/:sessionId/:name/:puzzleId', saveTime);
router.get('/time/top/:puzzleID', getTopTimes);

module.exports = router;
