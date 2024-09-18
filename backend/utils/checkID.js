const mongoose = require("mongoose");
const AppError = require("./appError");

module.exports = checkID = (req, res, next) => {
  const reqId = req.params.id;

  // Check if the ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(reqId)) {
    return next(
      new AppError(`${req.params.id} is not a valid MongoDB ObjectId!`, 400)
    );
  }

  next();
};
