const express = require("express");
const router = express.Router();
const { signup, postSignup } = require("../controllers/signup.controller");

router.get("/:username", signup);

router.post("/", postSignup);

module.exports = router;
