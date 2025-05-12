const express = require('express');
const indexController = require('../controllers/indexController');
const router = express.Router();

//localhost:4000/

//muestra la home
router.get('/', indexController.showHome);

//muestra el about
router.get('/about', indexController.showAbout)

module.exports = router;
