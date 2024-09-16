const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const userRouter = require("./routes/userRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

//For setting up http headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body parser
app.use(express.json());

//Data sanitization against NoSql query injection
app.use(mongoSanitize());

//Data sanitization against xss attacks
app.use(xss());

app.use("/api/v1/users", userRouter);

//Undefined Routes Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} in the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
