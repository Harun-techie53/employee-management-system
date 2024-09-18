const express = require("express");
const { protectRoute, restrictTo } = require("../middlewares/authMiddleware");
const attendanceLogController = require("../controllers/attendanceLogController");
const checkID = require("../utils/checkID");
const router = express.Router();

router.get(
  "/",
  protectRoute,
  restrictTo("admin"),
  attendanceLogController.getAllAttendanceLogs
);

router.get(
  "/employee",
  protectRoute,
  attendanceLogController.getEmployeeAttendanceLogs
);

router.post("/", protectRoute, attendanceLogController.createAttendanceLog);

router.patch(
  "/:id",
  protectRoute,
  checkID,
  attendanceLogController.updateAttendanceLog
);

module.exports = router;
