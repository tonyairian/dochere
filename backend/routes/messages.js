const express = require("express");
const Message = require("../models/messageModel");
const CryptoJS = require("crypto-js");
const router = express.Router();
const secretKey = "YourSecretKey123";
router.post("/", async (req, res) => {
  const plaintext = req.body.text;
  const ciphertext = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
  const messages = {
    sender: req.body.sender,
    text: ciphertext,
    conversationId: req.body.conversationId,
  };
  const newMessage = new Message(messages);
  try {
    const savedMessage = await newMessage.save();
    const ciphertext = savedMessage.text;
    const secretKey = "YourSecretKey123";
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    const decryptedPlaintext = bytes.toString(CryptoJS.enc.Utf8);
    const savedMessage1 = {
      conversationId: savedMessage.conversationId,
      sender: savedMessage.sender,
      text: decryptedPlaintext,
      _id: savedMessage._id,
      createdAt: savedMessage.createdAt,
      updatedAt: savedMessage.updatedAt,
      __v: 0,
    };
    res.status(200).json(savedMessage1);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    messages.map((m) => {
      const ciphertext = m.text;
      const secretKey = "YourSecretKey123";
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const decryptedPlaintext = bytes.toString(CryptoJS.enc.Utf8);
      m.text = decryptedPlaintext;
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
