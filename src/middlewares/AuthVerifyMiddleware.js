const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { token } = req.headers;
  jwt.verify(token, "SecretKeyLoneRanger", (err, decoded) => {
    if (err) {
      res.status(401).json({
        status: "unauthorized",
        data: {
          message: "Invalid Username / Password",
        },
      });
    } else {
      // Get username from Decoded token and add the username with request header
      const { userName } = decoded?.data;
      req.headers.username = userName;
      next();
    }
  });
};
