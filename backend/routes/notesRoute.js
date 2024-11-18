const express = require('express');

const { add, get } = require('../controllers/notesController');

const router = express.Router();

router.post('/add', add);
router.get('/get', get)

module.exports = router;