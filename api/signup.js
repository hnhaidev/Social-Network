const express = require("express");
const router = express.Router();
const { signup, postSignup } = require("../controllers/signup.controller");

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

router.get("/:username", signup);

router.post("/", postSignup);

module.exports = router;
