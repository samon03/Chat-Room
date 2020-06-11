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

exports.postRooms = (req, res, next) => {
    const title = req.body.title;
    const author = req.user;

    console.log({author , title});
  
    const chat = new Chat({
      title: title,
      author: author,
      chat: {}
    });
    chat
      .save()
      .then(result => {
        // console.log(result);
        console.log('Room Created');
        res.redirect('/chat');
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };