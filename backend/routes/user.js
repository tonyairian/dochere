const express = require("express");
const userController = require("../controllers/userController");
const verifyUser = require("../middlewares/userMiddleware");
const { verifyPayment } = require("../controllers/paymentController");
const store = require("../utils/multer");
const router = express.Router();
router.get("/", verifyUser);
router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/googlelogin", userController.googlelogin);
router.get("/doctor-specialization", userController.doctorSpecialization);
router.post(
  "/update-profile",
  store.any("images"),
  userController.updateProfile
);
router.get("/verify-email/:id", userController.verifyUserEmail);
router.post("/specialized-doctors", userController.specializedDoctors);
router.post("/forgot-password", userController.forgotPassword);
router.get(
  "/forgot-password-approve/:id",
  userController.forgotPasswordApprove
);
router.post("/new-password", userController.newPassword);
router.post("/check-availability", userController.checkAvailability);
router.post("/confirm-slot", userController.confirmSlot);
router.post("/confirm-booking", userController.confirmBooking);
router.post("/verify-payment", verifyPayment);
router.post("/book-session", userController.bookSession);
router.get("/appointment/:id", userController.getUserAppointments);
router.post("/cancel-appointment", userController.cancelAppointment);
router.post("/session-complete", userController.sessionComplete);
router.post("/create-conversation", userController.createConversation);
router.post("/getUserProfile",userController.getUserProfile);


module.exports = router;
