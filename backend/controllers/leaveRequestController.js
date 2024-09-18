const catchAsync = require("../utils/catchAsync");
const LeaveRequest = require("../models/leaveRequestModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllLeaveRequests = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(LeaveRequest.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const leaveRequests = await features.query;
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
      leaveRequests,
    },
  });
});

exports.getEmployeeLeaveRequests = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    LeaveRequest.find({ employee: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const employeeLeaveRequests = await features.query;
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
      employeeLeaveRequests,
    },
  });
});

exports.createLeaveRequest = catchAsync(async (req, res, next) => {
  const { from_date, to_date, reason } = req.body;

  const newLeaveRequest = new LeaveRequest({
    from_date,
    to_date,
    employee: req.user.id,
    status: "pending",
    reason,
  });

  await newLeaveRequest.save();

  res.status(201).json({
    status: "success",
    message: "Leave Request created successfully",
    data: {
      leaveRequest: newLeaveRequest,
    },
  });
});

exports.updateLeaveRequest = catchAsync(async (req, res, next) => {
  const leaveRequest = await LeaveRequest.findByIdAndUpdate(
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
      leaveRequest,
    },
  });
});
