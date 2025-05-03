const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Room', roomSchema);
