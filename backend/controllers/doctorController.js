const Doctor = require("../models/doctorSchema");
const Specialization = require("../models/specializationSchema");
const Appointment = require("../models/appointmentSchema");
const Session = require("../models/sessionSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { sendEmailDoctor } = require("../utils/nodeMailer");
const { forgotPasswordNodeMailerDoctor } = require("../utils/nodeMailer");
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};
// const doctorSignup = async (req, res) => {
//   try {
//     const { name, email, number, password } = req.body;
//     const verified = false;
//     const emailVerified = false;
//     const rejected = false;
//     const blocked = false;
//     const doctorDetails = {
//       name,
//       email,
//       number,
//       password,
//       verified,
//       emailVerified,
//       rejected,
//       blocked
//     };

//     await Doctor(doctorDetails)
//       .save()
//       .then(async (result) => {
//         const { email, _id } = result;
//         sendEmailDoctor(email, _id).then((data) => {
//           res.status(201).json({
//             doctorDetails: result,
//             doctorCreated: true,
//             mailSend: true,
//           });
//         });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

const doctorSignup = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    const verified = false;
    const emailVerified = false;
    const rejected = false;
    const blocked = false;
    const doctorDetails = {
      name,
      email,
      number,
      password,
      verified,
      emailVerified,
      rejected,
      blocked,
    };
    const doctorDb = await Doctor.find({ email: email });

    if (doctorDb.length != 0) {
      res.json({ emailAlreadyExists: true });
    } else {
      await Doctor(doctorDetails)
        .save()
        .then(async (result) => {
          const { email, _id } = result;
          sendEmailDoctor(email, _id).then((data) => {
            res.status(201).json({
              doctorDetails: result,
              doctorCreated: true,
              mailSend: true,
            });
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
};

const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctorDetailsFromDb = await Doctor.findOne({ email: email });
    if (doctorDetailsFromDb === null) {
      res.json({ doctorDetails: doctorDetailsFromDb, invalidEmail: true });
    }
    if (doctorDetailsFromDb) {
      bcrypt.compare(password, doctorDetailsFromDb.password).then((result) => {
        if (result) {
          const token = createToken(doctorDetailsFromDb._id);
          res.cookie("doctorToken", token, {
            httpOnly: false,
            maxAge: maxAge * 1000,
          });
          res.status(200).json({
            doctorDetails: result,
            validPassword: true,
            token: token,
            emailVerified: doctorDetailsFromDb.emailVerified,
            verified: doctorDetailsFromDb.verified,
            doctorId: doctorDetailsFromDb._id,
            documents: doctorDetailsFromDb.documents,
          });
        } else {
          res.status(200).json({ doctorDetails: result, validPassword: false });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const verifyDoctorDocuments = async (req, res) => {
  const image = req.files[0]?.filename;
  const { doctorId, regNumber, specialization, experience } = req.body;
  const documents = true;
  await Doctor.updateOne(
    { _id: doctorId },
    {
      $set: {
        regNumber: regNumber,
        specialization: specialization,
        experience: experience,
        image: image,
        documents: documents,
      },
    }
  )
    .then(() => {
      Doctor.findOne({ _id: doctorId }).then((result) => {
        const token = createToken(result._id);
        res.cookie("doctorToken", token, {
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({
          result: result,
          documentsSubmitted: true,
          verified: "pending",
          token: token,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDoctorDetails = async (req, res) => {
  const { doctor } = req.body;

  try {
    const decoded = jwt_decode(doctor);
    const doctorDetails = await Doctor.findById(decoded.id);
    if (doctorDetails) {
      res.json({ doctor: doctorDetails, doctorFound: true });
    } else {
      res.json({ doctor: doctorDetails, doctorFound: false });
    }
  } catch (error) {
    // console.log(error);
  }
};
const getSpecialization = async (req, res) => {
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

const verifyDoctorEmail = async (req, res) => {
  const doctorId = req.params.id.slice(3);
  try {
    const doctor = await Doctor.updateOne(
      {
        _id: doctorId,
      },
      { $set: { emailVerified: true } }
    );
    if (doctor) {
      res.redirect("http://localhost:3000/doctor/login");
    } else {
      console.log("dooooo");
    }
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { doctorEmail } = req.body;
  const doctor = await Doctor.findOne({
    email: doctorEmail,
  });
  if (doctor === null) {
    res.json({ invalidEmail: true });
  } else {
    forgotPasswordNodeMailerDoctor(doctor.email, doctor._id).then((data) => {
      res.json({ invalidEmail: false });
    });
  }
};

const forgotPasswordApprove = async (req, res) => {
  const doctorId = req.params.id.slice(3);
  res.redirect(`http://localhost:3000/doctor/forgot-password/${doctorId}`);
};

const newPassword = async (req, res) => {
  const newPassword = req.body.values.password;
  const doctorId = req.body.id;

  try {
    bcrypt.hash(newPassword, 10).then(async (saltedPassword) => {
      const passwordChanged = await Doctor.updateOne(
        { _id: doctorId },
        {
          $set: {
            password: saltedPassword,
          },
        }
      );
      if (passwordChanged.modifiedCount) {
        res.json({
          passwordChanged: true,
          userId: doctorId,
        });
      } else {
        res.json({
          passwordChanged: false,
          userId: doctorId,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const selectSlots = async (req, res) => {
  try {
    const { id, selectedDate } = req.body;
    const timings = req.body.selectedTimings;
    const uniqueTimings = [...new Set(timings.map((timing) => timing.time))];
    // Sort the unique times in ascending order
    const sortedTimings = uniqueTimings.sort((a, b) => {
      const aTime = new Date(`2000-01-01 ${a}`);
      const bTime = new Date(`2000-01-01 ${b}`);
      return aTime - bTime;
    });
    // let arr = [];
    // (arr.date = req.body.selectedDate), (arr.timings = sortedTimings);

    const appointments = {
      date: req.body.selectedDate,
      timings: sortedTimings,
    };
    const exist = await Appointment.findOne({
      doctor: id,
      "timeAndDate.date": selectedDate,
    });

    if (exist) {
      try {
        await Appointment.findOneAndUpdate(
          { doctor: id, "timeAndDate.date": selectedDate },
          { $set: { "timeAndDate.timings": sortedTimings } }
        )
        // .then((result)=>{
        //  if (result.timeAndDate.timings.length>0) {
        //   console.log("jelly");
        //   return res.status(200).json({ slotsAdded: true });
        //  }
        // })
        return res.status(200).json({ slotsAdded: true });
        
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const newDoctor = await Appointment.create({
        doctor: id,
        timeAndDate: appointments,
      });
     
    //  if (newDoctor.timeAndDate.timings.length>0) {
    //   return res.status(200).json({ slotsAdded: true });
    //  }
         return res.status(200).json({ slotsAdded: true });
    } catch (error) {
      // console.log(error); logs mongodb error
    }
  } catch (error) {
    console.log(error);
  }
};

const doctorDetails = async (req, res) => {
  const { doctorId } = req.body;

  try {
    const doctorData = await Doctor.findOne({ _id: doctorId });
    if (doctorData) {
      res.json({ doctorData: doctorData });
    } else {
      res.json({ doctorData: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  const profilePicture = req.files[0]?.filename;
  const { email, name, number, password } = req.body;
  if (password) {
    bcrypt.hash(password, 10).then(async (saltedPassword) => {
      const profileUpdated = await Doctor.updateOne(
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
        Doctor.find({ email: email }).then((doctor) => {
          res.json({
            doctorDetails: doctor,
            doctorProfileUpdated: true,
          });
        });
      });
    });
  } else {
    const profileUpdated = await Doctor.updateOne(
      { email: email },
      {
        $set: {
          name: name,
          profilePicture: profilePicture,
        },
      }
    );
    res.json({
      doctorDetails: profileUpdated,
      doctorProfileUpdated: true,
    });
  }
};

const reApply = async (req, res) => {
  const image = req.files[0]?.filename;
  const { doctorId, regNumber, specialization, experience } = req.body;
  const documents = true;
  await Doctor.updateOne(
    { _id: doctorId },
    {
      $set: {
        regNumber: regNumber,
        specialization: specialization,
        experience: experience,
        image: image,
        documents: documents,
        rejected: false,
      },
    }
  )
    .then(() => {
      Doctor.findOne({ _id: doctorId }).then((result) => {
        const token = createToken(result._id);
        res.cookie("doctorToken", token, {
          httpOnly: false,
          maxAge: maxAge * 1000,
        });
        res.status(200).json({
          result: result,
          documentsSubmitted: true,
          verified: "pending",
          token: token,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getAppointments = async (req, res) => {
  const { id } = req.params;
  try {
    const appointments = await Session.find({ doctorId: id });
    if (appointments) {
      res.json({ appointments });
    } else {
      res.json({ appointments: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const setLink = async (req, res) => {
  try {
    const setSessionLink = await Session.findByIdAndUpdate(
      { _id: req.body.sessionId },
      { $set: { link: req.body.link } }
    );
    if (setSessionLink) {
      res.json({ session: setSessionLink, link: true });
    } else {
      res.json({ session: setSessionLink, link: false });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  doctorSignup,
  doctorLogin,
  verifyDoctorDocuments,
  getDoctorDetails,
  getSpecialization,
  verifyDoctorEmail,
  forgotPassword,
  forgotPasswordApprove,
  newPassword,
  selectSlots,
  doctorDetails,
  updateProfile,
  reApply,
  getAppointments,
  setLink,
};
