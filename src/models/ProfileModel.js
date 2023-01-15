const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    emailAddress: { type: String },
    mobileNumber: { type: String },
    city: { type: String },
    userName: { type: String, unique: true },
    password: { type: String },
  },
  { versionKey: false }
);
const ProfileModel = mongoose.model("Profile", DataSchema);
module.exports = ProfileModel;
