const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is Required"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    // unique: true,
  },
  number: {
    type: Number,
    required: [true, "Number is Required"],
    // unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
  },
  blocked: {
    type: Boolean,
    // required: [true, "blocked is Required"],
  },
  emailVerified: {
    type: Boolean,
  },
  verified: {
    type: Boolean,
  },
  regNumber: {
    type: String,
  },
  specialization: {
    type: String,
  },
  experience: {
    type: String,
  },
  image: {
    type: String,
  },
  documents: {
    type: Boolean,
  },
  rejected: {
    type: Boolean,
  },
  // appointments: [
  //   {
  //     date: { type: String },
  //     times: [{ type: String }],
  //   },
  // ],
  profilePicture: {
    type: String,
  },
});

doctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Doctor", doctorSchema);
