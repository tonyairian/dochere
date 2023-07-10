const Admin = require("../models/adminSchema");
const User = require("../models/userSchema");
const Doctor = require("../models/doctorSchema");
const jwt = require("jsonwebtoken");
const Specialization = require("../models/specializationSchema");
const maxAge = 3 * 24 * 60 * 60;
const { doctorReject, doctorApprovalEmail } = require("../utils/nodeMailer");
const createToken = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: maxAge,
  });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const adminDetails = await Admin.findOne({ email: email });
  if (adminDetails === null) {
    res.json({ invalidEmail: true });
  }
  if (adminDetails) {
    const checkPassword = await Admin.findOne({
      email: email,
      password: password,
    });
    if (checkPassword === null) {
      res.json({ invalidPassword: true });
    } else {
      const token = createToken(checkPassword._id);
      res.cookie("adminToken", token, {
        httpOnly: false,
        maxAge: maxAge * 1000,
      });
      res.json({
        adminDetails: checkPassword,
        token: token,
        validPassword: true,
      });
    }
  }
};

const userList = async (req, res) => {
  try {
    const users = await User.find({});
    if (users === null) {
      res.json({ emptyList: true });
    } else {
      res.json({ emptyList: false, users: users });
    }
  } catch (error) {
    console.log(error);
  }
};
const blockUser = async (req, res) => {
  const { _id, name } = req.body;
  try {
    const user = await User.updateOne(
      { _id: _id },
      { $set: { blocked: true } }
    );
    res.json({ blocked: true, userName: name });
  } catch (error) {
    console.log(error);
  }
};
const unblockUser = async (req, res) => {
  const { _id, name } = req.body;
  try {
    const user = await User.updateOne(
      { _id: _id },
      { $set: { blocked: false } }
    );
    res.json({ UnBlocked: true, userName: name });
  } catch (error) {
    console.log(error);
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    if (doctors === null) {
      res.json({ emptyList: true });
    } else {
      res.json({ emptyList: false, doctors: doctors });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifyDoctor = async (req, res) => {
  const { id } = req.body;

  try {
    const doctor = await Doctor.findOne({ _id: id });
    if (doctor) {
      res.json({ doctor: doctor, doctorFound: true });
    } else {
      res.json({ doctorFound: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const approveDoctor = async (req, res) => {
  const { _id } = req.body;
  try {
    Doctor.findOneAndUpdate({ _id: _id }, { $set: { verified: true } }).then(
      () => {
        Doctor.findOne({ _id: _id }).then((doctor) => {
          res.json({ doctor: doctor, verified: true });
          doctorApprovalEmail(doctor.email, doctor._id).then((data) => {
            console.log("doctor verification email sent");
          });
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const rejectDoctor = async (req, res) => {
  const { _id } = req.body;
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { _id: _id },
      { $set: { rejected: true } }
    ).then(() => {
      Doctor.findOne({ _id: _id }).then((result) => {
        doctorReject(result.email, result._id).then((data) => {
          console.log("doctor reject mail has been sent");
        });
      });
    });

    res.json({ doctor: doctor, rejected: true });
  } catch (error) {
    console.log(error);
  }
};

const addSpecialization = async (req, res) => {
  const { inputValue } = req.body;
  const text = inputValue.toLowerCase();
  try {
    const spec = {
      specialization: text.charAt(0).toUpperCase() + text.slice(1),
    };
    const specializationInDb = await Specialization.find({});
    const data = specializationInDb.find((s) => {
      if (s.specialization === spec.specialization) {
        return true;
      } else {
        return false;
      }
    });

    if (data === undefined) {
      const specialization = await Specialization(spec).save();
      if (specialization) {
        res.json({
          specialization: specialization,
          created: true,
          specializationExist: false,
        });
      }
    } else {
      res.json({ specializationExist: true, created: false });
    }
  } catch (error) {
    console.log(error);
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

const editSpecialization = async (req, res) => {
  const { id, inputValue } = req.body;
  try {
    const updated = await Specialization.updateOne(
      { _id: id },
      { $set: { specialization: inputValue } }
    );

    if (updated.modifiedCount) {
      res.json({ specializationUpdated: true });
    } else {
      res.json({ specializationUpdated: false });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteSpecialization = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedSpecialization = await Specialization.findByIdAndDelete(id);
    if (deletedSpecialization) {
      res.json({
        deletedSpecialization: deletedSpecialization,
        specializationDeleted: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const verifiedDoctors = async (req, res) => {
  try {
    const verifiedDocs = await Doctor.find({ verified: true });
    if (verifiedDocs) {
      res.json({
        doctors: verifiedDocs,
        doctorsFound: true,
      });
    } else {
      res.json({
        doctorsFound: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const blockDoctor = async (req, res) => {
  const { _id, name } = req.body;
  try {
    const doctor = await Doctor.updateOne(
      { _id: _id },
      { $set: { blocked: true } }
    );
    res.json({ blocked: true, doctorName: name });
  } catch (error) {
    console.log(error);
  }
};
const unblockDoctor = async (req, res) => {
  const { _id, name } = req.body;
  try {
    const doctor = await Doctor.updateOne(
      { _id: _id },
      { $set: { blocked: false } }
    );
    res.json({ UnBlocked: true, DoctorName: name });
  } catch (error) {
    console.log(error);
  }
};

const pendingDoctorList=async(req,res)=>{
  try {
    const pendingDocs = await Doctor.find({ verified: false });
    if (pendingDocs) {
      res.json({
        doctors: pendingDocs,
        doctorsFound: true,
      });
    } else {
      res.json({
        doctorsFound: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  adminLogin,
  userList,
  blockUser,
  unblockUser,
  doctorList,
  verifyDoctor,
  approveDoctor,
  rejectDoctor,
  addSpecialization,
  getSpecialization,
  editSpecialization,
  deleteSpecialization,
  verifiedDoctors,
  blockDoctor,
  unblockDoctor,
  pendingDoctorList
};
