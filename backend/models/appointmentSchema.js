const mongoose = require("mongoose");
const dateAndTime = {
  date: {
    type: String,
    required: true,
  },
  timings: {
    type: [String],
    required: true,
  },
};

const AppointmentSchema = mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  timeAndDate: {
    type: dateAndTime,
  },
});

module.exports = mongoose.model("Appointment", AppointmentSchema);