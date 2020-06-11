const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  chat: {
    items: [
      {
        sender: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
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