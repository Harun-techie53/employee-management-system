const { z } = require("zod");

const objectIdRegex = /^[a-f\d]{24}$/i;
const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

exports.createTaskSchema = z.object({
  assignedTo: z
    .string()
    .refine((value) => objectIdRegex.test(value), {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
  title: z.string(),
  description: z.string(),
  dueDate: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY"),
  status: z.enum(["to_do", "in_progress", "done"]).optional(),
});

exports.updateTaskSchema = z.object({
  assignedTo: z
    .string()
    .refine((value) => objectIdRegex.test(value), {
      message: "Invalid MongoDB ObjectId format",
    })
    .optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z
    .string()
    .regex(dateRegex, "Invalid date format. Expected DD-MM-YYYY")
    .optional(),
  status: z.enum(["to_do", "in_progress", "done"]).optional(),
});
