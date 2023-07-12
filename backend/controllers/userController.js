const User = require("../models/userSchema");
const Doctor = require("../models/doctorSchema");
const Specialization = require("../models/specializationSchema");
const Appointment = require("../models/appointmentSchema");
const Session = require("../models/sessionSchema");
const Conversation = require("../models/conversationModel");
const { order } = require("./paymentController");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/nodeMailer");
const { forgotPasswordNodeMailer } = require("../utils/nodeMailer");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const userSignup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const blocked = false;
    const emailVerified = false;
    const userDetails = {
      name,
      email,
      number,
      password,
      blocked,
      emailVerified,
    };

    const userDb = await User.find({ email: email, password: { $ne: null } });
    if (userDb.length != 0) {
      res.json({ emailAlreadyExists: true });
    } else {
      User(userDetails)
        .save()
        .then(async (result) => {
          const { email, _id } = result;
          sendEmail(email, _id).then((data) => {
            res
              .status(201)
              .json({ userDetails: result, userCreated: true, mailSend: true });
            // console.log(JSON.stringify(data, null, 4));
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetailsFromDb = await User.findOne({
      email: email,
      password: { $ne: null },
    });
    if (userDetailsFromDb === null) {
      res.json({ userDetails: userDetailsFromDb, invalidEmail: true });
    }
    if (userDetailsFromDb) {
      bcrypt.compare(password, userDetailsFromDb.password).then((result) => {
        if (result) {
          const token = createToken(userDetailsFromDb._id);
          res.cookie("userToken", token, {
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
          res.status(200).json({
            userDetails: result,
            validPassword: true,
            token: token,
            emailVerified: userDetailsFromDb.emailVerified,
            blocked: userDetailsFromDb.blocked,
          });
        } else {
          res.status(200).json({ userDetails: result, validPassword: false });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const googlelogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    const blocked = false;
    const number = null;
    const password = null;
    const userDetails = {
      name,
      email,
      number,
      password,
      blocked,
    };
    const userDetailsFromDb = await User.findOne({
      email: email,
      password: null,
    });
    if (userDetailsFromDb) {
      const userId = userDetailsFromDb._id;
      const token = createToken(userId);
      res.cookie("userToken", token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({
        userDetails: userDetailsFromDb,
        userCreated: true,
        token: token,
      });
    } else {
      await User(userDetails)
        .save()
        .then((result) => {
          const userId = result._id;
          const token = createToken(userId);
          res.cookie("userToken", token, {
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
          res
            .status(201)
            .json({ userDetails: result, userCreated: true, token: token });
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const doctorSpecialization = async (req, res) => {
  try {
    const spec = await Specialization.find({});
    const specializations = spec.filter(
      (obj) => obj.specialization !== "" && obj.specialization !== undefined
    );

    if (specializations) {
      res.json({
        specializations: specializations,
        specializationsFound: true,
      });
    } else {
      res.json({ specializationsFound: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  const profilePicture = req.files[0]?.filename;
  const { email, name, number, password } = req.body;
  try {
    if (password || number) {
      bcrypt.hash(password, 10).then(async (saltedPassword) => {
        const profileUpdated = await User.updateOne(
          { email: email },
          {
            $set: {
              name: name,
              number: number,
              password: saltedPassword,
              profilePicture: profilePicture,
            },
          }
        ).then(() => {
          User.find({ email: email }).then((user) => {
            res.json({
              userDetails: user,
              userProfileUpdated: true,
              googleUser: false,
            });
          });
        });
      });
    } else {
      const profileUpdated = await User.updateOne(
        { email: email },
        {
          $set: {
            name: name,
            profilePicture: profilePicture,
            number: "",
          },
        }
      );
      res.json({
        userDetails: profileUpdated,
        userProfileUpdated: true,
        googleUser: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyUserEmail = async (req, res) => {
  try {
    const userId = req.params.id.slice(3);
    const user = await User.updateOne(
      {
        _id: userId,
        password: { $ne: null },
      },
      { $set: { emailVerified: true } }
    );
    if (user) {
      res.redirect("http://localhost:3000/login");
    } else {
      console.log("ooooo");
    }
  } catch (error) {
    console.log(error);
  }
};

const specializedDoctors = async (req, res) => {
  const { id } = req.body;
  try {
    const specialization = await Specialization.findById(id);
    const doctors = await Doctor.aggregate([
      {
        $match: {
          specialization: specialization.specialization,
          verified: true,
        },
      },
      {
        $project: {
          name: "$name",
          specialization: "$specialization",
          experience: "$experience",
          regNumber: "$regNumber",
          profilePicture: "$profilePicture",
        },
      },
    ]);
    if (doctors.length != 0) {
      res.json({
        doctors: doctors,
        doctorFound: true,
      });
    } else {
      res.json({
        doctorFound: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const forgotPassword = async (req, res) => {
  const { userEmail } = req.body;

  const user = await User.findOne({
    email: userEmail,
    password: { $ne: null },
  });

  if (user === null) {
    res.json({ invalisEmail: true });
  } else {
    forgotPasswordNodeMailer(user.email, user._id).then(() => {
      res.json({ invalisEmail: false });
    });
  }
};

const forgotPasswordApprove = async (req, res) => {
  const userId = req.params.id.slice(3);
  // res.redirect(`http://localhost:3000/forgot-password/${userId}`);
  res.redirect(`https://dochere.online/forgot-password/${userId}`);
};
const newPassword = async (req, res) => {
  const newPassword = req.body.values.password;
  const userId = req.body.id;

  try {
    bcrypt.hash(newPassword, 10).then(async (saltedPassword) => {
      const passwordChanged = await User.updateOne(
        { _id: userId },
        {
          $set: {
            password: saltedPassword,
          },
        }
      );
      if (passwordChanged.modifiedCount) {
        res.json({
          passwordChanged: true,
          userId: userId,
        });
      } else {
        res.json({
          passwordChanged: false,
          userId: userId,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const checkAvailability = async (req, res) => {
  try {
    const { doctorId, date } = req.body;
    const findTime = await Appointment.findOne({
      doctor: doctorId,
      "timeAndDate.date": date,
    });

    res
      .status(200)
      .json({ slots: findTime.timeAndDate.timings, slotsFound: true });
  } catch (error) {
    res.status(200).json({ slotsFound: false });
    // console.log(error);
  }
};

const confirmSlot = async (req, res) => {
  const { doctorId, userId, date, slot, fee } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const doctor = await Doctor.findOne({ _id: doctorId });
    details = {
      userId: user.id,
      userName: user.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      timeSlot: slot,
      sessionDate: date,
      fee: fee,
    };

    // const saveSession = await Session(details).save();
    if (user && doctor) {
      res.json({ doctor: doctor, user: user });
    } else {
      res.json({ doctor: false, user: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const confirmBooking = async (req, res) => {
  order(req, res);
};

const bookSession = async (req, res) => {
  try {
    const timeSlot = req.body.slot;
    const sessionDate = req.body.date;
    const fee = req.body.fee;
    const today = moment().format("YYYY-MM-DD");
    const userDetails = req.body.userDetails;
    const doctorDetails = req.body.doctorDetails;

    //changed time fromat to 24 hours
    const inputTime = timeSlot;
    const timeFormat = "h:mm A";
    const parsedTime = moment(inputTime, timeFormat);
    const timeString = parsedTime.format("HH:mm");
    const data = {
      userId: userDetails._id,
      userName: userDetails.name,
      doctorId: doctorDetails._id,
      doctorName: doctorDetails.name,
      fee: fee,
      bookedDate: today,
      sessionDate: sessionDate,
      timeSlot: timeString,
    };
    const booked = await Session(data).save();
    if (booked) {
      const removeTimeSlot = await Appointment.updateOne(
        { doctor: doctorDetails._id, "timeAndDate.date": sessionDate },
        { $pull: { "timeAndDate.timings": timeSlot } }
      );
      if (removeTimeSlot.modifiedCount) {
        res
          .status(200)
          .json({ message: "Session booked successfully", session: true });
        //booked as json
      }
    } else {
      res.json({ message: "Session booking failed", session: false });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserAppointments = async (req, res) => {
  const { id } = req.params;
  try {
    const appointments = await Session.find({ userId: id });
    if (appointments) {
      res.json({ appointments });
    } else {
      res.json({ appointments: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const cancelAppointment = async (req, res) => {
  const { sessionDate, timeSlot, _id, doctorId } = req.body;
  const time24Hour = timeSlot; // Replace with your 24-hour format time
  const time12Hour = moment(time24Hour, "HH:mm").format("hh:mm A");
  try {
    addTimeSlotBackToDoctor = await Appointment.updateOne(
      { doctor: doctorId, "timeAndDate.date": sessionDate },
      { $push: { "timeAndDate.timings": time12Hour } }
    );
    const deleteSession = await Session.deleteOne({ _id: _id });
    if (deleteSession.acknowledged === true) {
      res.json({ sessionDeleted: true });
    }
    console.log(deleteSession);
  } catch (error) {
    console.log(error);
  }
};

const sessionComplete = async (req, res) => {
  // console.log(req.body);
  const result = await Session.findOneAndUpdate(
    { _id: req.body._id },
    { $set: { sessionComplete: true } }
  );
  res.json({ result });
};

const createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.userDetails._id, req.body.doctorDetails._id],
  });
  const savedConversation = await newConversation.save();
};

const getUserProfile = async (req, res) => {
  const { userId } = req.body;
  try {
    const userData = await User.findOne({ _id: userId });
    if (userData) {
      res.json({ userData: userData });
    } else {
      res.json({ userData: false });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userSignup,
  userLogin,
  googlelogin,
  doctorSpecialization,
  updateProfile,
  verifyUserEmail,
  specializedDoctors,
  forgotPassword,
  forgotPasswordApprove,
  newPassword,
  checkAvailability,
  confirmSlot,
  confirmBooking,
  bookSession,
  getUserAppointments,
  cancelAppointment,
  sessionComplete,
  createConversation,
  getUserProfile,
};
