const ProfileModel = require("../models/ProfileModel");
const jwt = require("jsonwebtoken");

// User Registration
exports.CreateProfile = (req, res) => {
  const reqBody = req.body;
  ProfileModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: {
          user: data,
        },
      });
    }
  });
};

// User Profile Update
exports.UpdateProfile = (req, res) => {
  const userName = req.headers.username;
  const reqBody = req.body;
  ProfileModel.updateOne(
    { userName },
    { $set: reqBody },
    { upsert: true },
    (err, data) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          data: {
            error: err,
          },
        });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            user: data,
          },
        });
      }
    }
  );
};

exports.UserLogin = (req, res) => {
  let { userName, password } = req.body;
  ProfileModel.find({ userName, password }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      if (data?.length > 0) {
        const userData = data?.[0];
        // Create Auth Token
        const Payload = {
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
          data: userData,
        };
        const token = jwt.sign(Payload, "SecretKeyLoneRanger");
        res.status(200).json({ status: "success", jwt: token, data: userData });
      } else {
        res.status(401).json({
          status: "unauthorized",
          data: {
            message: "Invalid Username / Password",
          },
        });
      }
    }
  });
};

exports.TokenVerify = (req, res) => {
  ProfileModel.find({ userName: req.headers.username }, (err, data) => {
    if (err) {
      res.status(400).json({
        status: "fail",
        data: {
          error: err,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        data: data[0],
      });
    }
  }).projection({
    firstName: 1,
    lastName: 1,
    emailAddress: 1,
    mobileNumber: 1,
  });
};
