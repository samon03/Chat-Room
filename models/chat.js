const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  users: [
    {
      user: { type: Object, required: true }
    }
  ],
  chat: {
    items: [
      {
        _id: {
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