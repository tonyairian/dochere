const mongoose = require("mongoose");

const specializationSchema = new mongoose.Schema({
  specialization: {
    type: String,
  },
});

module.exports = mongoose.model("Specialization", specializationSchema);
