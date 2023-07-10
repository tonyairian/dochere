const express = require("express");
const Conversation = require("../models/conversationModel");
const router = express.Router();
const User = require("../models/userSchema");
const Doctor = require("../models/doctorSchema");
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/chatUser/:id", async (req, res) => {
//   try {
//     console.log(req.params.id);
//     const user = await User.findOne({ _id: req.params.id });
//     const doc = await Doctor.findOne({ _id: req.params.id });
//     console.log(doc);
//     console.log(user);
//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/chatUser/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const doc = await Doctor.findOne({ _id: req.params.id });
    res.status(200).json({user:user,doctor:doc});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
