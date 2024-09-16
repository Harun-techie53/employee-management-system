const express = require("express");
const authController = require("../controllers/authController");
const { protectRoute } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const {
  signUpSchema,
  signInSchema,
} = require("../validationSchema/userSchema");
const router = express.Router();

router.post("/signUp", validate(signUpSchema), authController.signUpUser);
router.post("/signIn", validate(signInSchema), authController.signInUser);

module.exports = router;
