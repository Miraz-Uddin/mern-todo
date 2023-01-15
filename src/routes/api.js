const express = require("express");
const ProfileController = require("../controllers/ProfileController");
const TokenVerify = require("../middlewares/AuthVerifyMiddleware");
const router = express.Router();

// User Registration
router.post("/profiles", ProfileController.CreateProfile);
// User Login
router.post("/login", ProfileController.UserLogin);
// User Login
router.get("/me", TokenVerify, ProfileController.TokenVerify);

module.exports = router;
