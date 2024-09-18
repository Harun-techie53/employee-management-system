const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const AttendanceLog = require("../models/attendanceLogModel");
const AppError = require("../utils/appError");

exports.getAllAttendanceLogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(AttendanceLog.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const attendanceLogs = await features.query;
  const total_documents = await features.totalCountDocuments();

  res.status(200).json({
    status: "success",
    meta: {
      current_page: parseInt(features.queryString.page),
      page_size: parseInt(features.queryString.limit),
      total_pages: Math.ceil(
        parseInt(total_documents.toString()) /
          parseInt(features.queryString.limit?.toString())
      ),
      total_documents,
    },
    data: {
      attendanceLogs,
    },
  });
});

exports.getEmployeeAttendanceLogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    AttendanceLog.find({ employee: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const employeeAttendanceLogs = await features.query;
  const total_documents = await features.totalCountDocuments();

  res.status(200).json({
    status: "success",
    meta: {
      current_page: parseInt(features.queryString.page),
      page_size: parseInt(features.queryString.limit),
      total_pages: Math.ceil(
        parseInt(total_documents.toString()) /
          parseInt(features.queryString.limit?.toString())
      ),
      total_documents,
    },
    data: {
      employeeAttendanceLogs,
    },
  });
});

exports.createAttendanceLog = catchAsync(async (req, res, next) => {
  const { checkIn, checkOut, workDay } = req.body;

  const newAttendanceLog = new AttendanceLog({
    checkIn,
    checkOut,
    employee: req.user.id,
  });

  await newAttendanceLog.save();

  res.status(201).json({
    status: "success",
    message: "Attendance Log created successfully",
    data: {
      attendanceLog: newAttendanceLog,
    },
  });
});

exports.updateAttendanceLog = catchAsync(async (req, res, next) => {
  const attendanceLog = await AttendanceLog.findById(req.params.id);

  if (!attendanceLog) {
    return next(new AppError("Attendance Log not found", 404));
  }

  if (req.user.id.toString() !== attendanceLog.employee.toString()) {
    return next(new AppError("Employee ID not matched", 403));
  }

  const updatedAttendanceLog = await AttendanceLog.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      attendanceLog: updatedAttendanceLog,
    },
  });
});
