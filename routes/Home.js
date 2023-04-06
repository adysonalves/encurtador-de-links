const express = require("express");
const router = express.Router();

// CONTROLLERS
const UrlsController = require('../controllers/UrlsControllers');

router.get('/', UrlsController.home);
router.get('/encurtada', UrlsController.encurtada)
router.get('/u/:url?', UrlsController.acessaLink);
router.get('/audiencia/:url?', UrlsController.viewsUrl);
router.post('/encurtar', UrlsController.createLink);

module.exports = router;