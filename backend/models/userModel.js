const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password length must be 8 or more characters!"],
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: [true, "Role is required"],
  },
  joinedAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  // if password is not modified then go to next
  if (!this.isModified("password")) return next();

  // if password is modified
  this.password = await bcrypt.hash(this.password, 12);

  //after hashing the password simply delete the confirm password
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.matchPassword = async function matchPassword(
  candidatePassword,
  userPassword
) {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);
  return isMatch;
};

module.exports = User = new mongoose.model("User", userSchema);
