const express = require("express");
const taskController = require("../controllers/taskController");
const { protectRoute, restrictTo } = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const {
  createTaskSchema,
  updateTaskSchema,
} = require("../validationSchema/taskSchema");
const checkID = require("../utils/checkID");
const router = express.Router();

router.get("/", protectRoute, taskController.getAllTasks);

router.get("/employee", protectRoute, taskController.getEmployeeTasks);

router.post(
  "/",
  protectRoute,
  validate(createTaskSchema),
  taskController.createTask
);

router.patch(
  "/:id",
  protectRoute,
  checkID,
  validate(updateTaskSchema),
  taskController.updateTask
);

router.delete(
  "/:id",
  protectRoute,
  restrictTo("admin"),
  checkID,
  taskController.deleteTask
);

module.exports = router;
