const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
    // required: [true, "Number is Required"],
    // unique: true,
  },
  password: {
    type: String,
    // required: [true, "Password is Required"],
  },
  blocked: {
    type: Boolean,
    // required: [true, "blocked is Required"],
  },
  profilePicture: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.number) {
    next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", userSchema);
