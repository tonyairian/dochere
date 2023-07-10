const User = require("../models/userSchema");
const Doctor = require("../models/doctorSchema");
const Conversation = require("../models/conversationModel");
const openConversation = async (req, res) => {
  try {
    const user1 = await User.findById(req.body.senderId);
    const user2 = await Doctor.findById(req.body.receiverId);
    if (!user1 || !user2) return res.status(404).json("user does not exist");
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  openConversation,
};
