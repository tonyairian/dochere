const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  bookedDate: {
    type: String,
    required: true,
  },
  sessionDate: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  // startTime: {
  //   type: String,
  //   required: true,
  // },
  link:{
    type:String,
  },
  sessionComplete:{
    type:Boolean,
  }
});

module.exports = mongoose.model("Session", sessionSchema);
