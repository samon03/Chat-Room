const path = require('path');

const express = require('express');

const chatController = require('../controllers/chat');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/create', isAuth, chatController.getRooms);

router.get('/room/:roomId', isAuth, chatController.getRoom);

router.post('/create', isAuth, chatController.postRooms);

router.post('/room/:roomId', isAuth, chatController.postRoom);

module.exports = router;
