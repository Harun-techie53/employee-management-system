const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Task = require("../models/taskModel");
const AppError = require("../utils/appError");

exports.getAllTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Task.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const tasks = await features.query;
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
      tasks,
    },
  });
});

exports.getEmployeeTasks = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Task.find({ assignedTo: req.user.id }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const employeeTasks = await features.query;
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
      employeeTasks,
    },
  });
});

exports.createTask = catchAsync(async (req, res, next) => {
  const { title, description, dueDate } = req.body;
  let { assignedTo, status } = req.body;

  if (req.user.role === "employee") {
    assignedTo = req.user.id;
    status = "in_progress";
  } else {
    assignedTo = req.body.assignedTo;
    status = "to_do";
  }

  const newTask = new Task({
    assignedTo,
    title,
    description,
    dueDate,
    status,
  });

  await newTask.save();

  res.status(201).json({
    status: "success",
    message: "Task created successfully",
    data: {
      task: newTask,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  if (req.user.role === "employee") {
    if (!!req.body.assignedTo) {
      return next(
        new AppError("Employee can't assign task to other employee", 403)
      );
    }

    if (
      !!req.body.status &&
      task.assignedTo.toString() !== req.user.id.toString()
    ) {
      return next(new AppError("Employee ID not matched", 400));
    }
  }

  if (!!req.body.assignedTo && !req.body.status) {
    req.body.status = "in_progress";
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      task: updatedTask,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    return next(new AppError("Task not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
