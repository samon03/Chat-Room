const Chat = require('../models/chat');

exports.getRooms = (req, res, next) => {
    Chat.find()
    .then(rooms => {
      console.log('User: ' + req.user.name);
      res.render('chat/create', {
        rooms: rooms,
        pageTitle: 'Join Rooms',
        path: '/create'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getRoom = (req, res, next) => {
  const roomId = req.params.roomId;
  Chat.findById(roomId)
    .then(room => {
      const convo = [...room.chat.items];
      res.render('chat/room', {
        room: room,
        convo: convo,
        pageTitle: room.title,
        path: '/room/' + roomId
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postRooms = (req, res, next) => {
    const title = req.body.title;
    const user = req.user;

    console.log({user , title});
  
    const chat = new Chat({
      title: title,
      users: [
        { user: user }
      ],
      chat: {}
    });
    chat
      .save()
      .then(room => {
        console.log('Room Created');
        const roomId = room._id;
        res.redirect('/room/' + roomId);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };

  exports.postRoom = (req, res, next) => {
    const roomId = req.params.roomId;
    const messages = req.body.msg;
    const senderId = req.user._id;
    const sender = req.user.name;

    console.log({ roomId, messages, senderId, sender });

    Chat.findById(roomId)
      .then(room => {
        room.chat.items.push({
          _id: senderId,
          sender: sender,
          messages: messages
        });
        room.save();
      })
      .then(result => {
        res.redirect('/room/' + roomId);
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };
