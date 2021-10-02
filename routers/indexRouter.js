const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/home", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/home.html"));
});

router.get("/changePass", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/changePass.html"));
});

router.get("/profile", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/profile.html"));
});

router.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "../views/login.html"));
});
module.exports = router;
