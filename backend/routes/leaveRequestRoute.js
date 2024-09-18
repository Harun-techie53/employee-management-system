const express = require("express");
const { restrictTo, protectRoute } = require("../middlewares/authMiddleware");
const leaveRequestController = require("../controllers/leaveRequestController");
const validate = require("../middlewares/validate");
const {
  leaveRequestSchema,
} = require("../validationSchema/leaveRequestSchema");
const checkID = require("../utils/checkID");
const router = express.Router();

router.get(
  "/",
  protectRoute,
  restrictTo("admin"),
  leaveRequestController.getAllLeaveRequests
);

router.get(
  "/employee",
  protectRoute,
  leaveRequestController.getEmployeeLeaveRequests
);

router.post(
  "/",
  protectRoute,
  validate(leaveRequestSchema),
  leaveRequestController.createLeaveRequest
);

router.patch(
  "/:id",
  protectRoute,
  restrictTo("admin"),
  checkID,
  leaveRequestController.updateLeaveRequest
);

module.exports = router;
