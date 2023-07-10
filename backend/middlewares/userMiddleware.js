const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  let cookies = {};
  const cookiesArray = req.headers.cookie.split(";");
  cookiesArray.forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    cookies[key] = value;
  });
  
  if (cookies.userToken) {
    jwt.verify(cookies.userToken, "secret", async (err, decodedToken) => {
      if (err) {
        return res.json({ status: false });
        // next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({
            status: true,
            email: user.email,
            name: user.name,
            id: user._id,
            number: user.number,
            blocked: user.blocked,
            profilePicture: user.profilePicture,
          });
        } else {
          res.json({ status: false });
        }

        next();
      }
    });
  }
};

module.exports = verifyUser;
