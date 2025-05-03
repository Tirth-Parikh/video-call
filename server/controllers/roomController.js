const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const roomCode = Math.random().toString(36).substring(2, 8);
  const room = await Room.create({ roomCode });
  res.status(201).json({ roomCode: room.roomCode });
};
