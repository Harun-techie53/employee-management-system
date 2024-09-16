const { z } = require("zod");
const AppError = require("../utils/appError");

module.exports = validate = (schema) => {
  return function (req, res, next) {
    if (!schema) {
      return next(new AppError("Schema is undefined!", 500));
    }

    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Check if the error is a Zod validation error
        return res.status(400).json({
          message: "Validation error",
          errors: error.errors, // Zod provides detailed errors
        });
      }
      next(error);
    }
  };
};
