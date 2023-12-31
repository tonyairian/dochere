const Doctor = require("../models/doctorSchema");
const jwt = require("jsonwebtoken");

const verifyDoctor = (req, res, next) => {
  const { doctorToken } = req.body;
  //   let cookies = {};
  //   const cookiesArray = req.headers.cookie.split(";");

  //   cookiesArray.forEach((cookie) => {
  //     const [key, value] = cookie.trim().split("=");
  //     cookies[key] = value;
  //   });
  // console.log(cookies);
  if (doctorToken) {
    jwt.verify(doctorToken, "secret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const doctor = await Doctor.findById(decodedToken.id);

        if (doctor) {
          res.json({
            status: true,
            doctor: doctor,
          });
        } else {
          res.json({ status: false });
        }

        next();
      }
    });
  }
};

module.exports = verifyDoctor;
