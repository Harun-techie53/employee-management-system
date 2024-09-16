const { z } = require("zod");

const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(255, { message: "Name must be less than 255 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password length must be 8 or more characters" }),
    passwordConfirm: z
      .string()
      .min(1, { message: "Password confirm is required" }),
    role: z.enum(["employee", "admin"], {
      message: "Role must be either 'employee' or 'admin'",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password do not match",
    path: ["passwordConfirm"],
  });

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password length must be 8 or more characters" }),
});

module.exports = { signInSchema, signUpSchema };
