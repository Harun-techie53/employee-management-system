const { z } = require("zod");

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

exports.leaveRequestSchema = z.object({
  from_date: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY"),
  to_date: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY"),
  reason: z.string(),
});

exports.updateLeaveRequestSchema = z.object({
  from_date: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY")
    .optional(),
  to_date: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY")
    .optional(),
  status: z.enum(["pending", "approved", "declined"]).optional(),
  reason: z.string().optional(),
});
