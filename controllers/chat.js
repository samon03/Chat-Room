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
      const convo = room.chat.items;
      res.render('chat/room', {
        room: room,
        convo: convo,
        pageTitle: room.title,
        path: '/room'
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
    const authorId = req.user;
    const author = req.user.name;
    // const roomId  = req.params.roomId;

    console.log({author , title});
  
    const chat = new Chat({
      title: title,
      authorId: authorId,
      author: author,
      chat: {}
    });
    chat
      .save()
      .then(room => {
        // console.log(result);
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