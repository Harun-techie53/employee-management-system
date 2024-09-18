const mongoose = require("mongoose");

const attendanceLogSchema = mongoose.Schema({
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    default: null,
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = AttendanceLog = mongoose.model(
  "AttendanceLog",
  attendanceLogSchema
);
