const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  author: {
    type: String,
    required: true
  },
  chat: {
    items: [
      {
        senderId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        sender: {
          type: String,
          required: true
        },
        messages: {
          type: String,
          required: true
        } 
      },{
        timestamps: true
      }
    ]
  }
});

module.exports = mongoose.model('Room', roomSchema);