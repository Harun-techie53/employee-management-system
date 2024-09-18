const { z } = require("zod");

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

exports.createAttendanceLogSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date().optional(),
});

exports.updateAttendanceLogSchema = z.object({
  checkIn: z.date().optional(),
  checkOut: z.date().optional(),
});
