const path = require('path');

const express = require('express');

const chatController = require('../controllers/chat');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/create', isAuth, chatController.getRooms);

router.get('/room/:roomId', chatController.getRoom);

router.post('/create', isAuth, chatController.postRooms);

// router.post('/chat', isAuth, chatController.postCartDeleteProduct);

module.exports = router;
