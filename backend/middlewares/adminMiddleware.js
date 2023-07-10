const Admin = require("../models/adminSchema");
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  let cookies = {};
  const cookiesArray = req.headers.cookie.split(";");

  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });

  if (cookies.adminToken) {
    jwt.verify(cookies.adminToken, "secret", async (err, decodedToken) => {
      if (err) {
        res.json({ status: false });
        next();
      } else {
        const admin = await Admin.findById(decodedToken.id);

        if (admin) {
          res.json({
            status: true,
            email: admin.email,

            id: admin._id,
          });
        } else {
          res.json({ status: false });
        }

        next();
      }
    });
  }
};

module.exports = verifyAdmin;
