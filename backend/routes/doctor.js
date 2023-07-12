const router = require("express").Router();
const doctorController = require("../controllers/doctorController");
const verifyDoctor = require("../middlewares/doctorMiddleware");
const store = require("../utils/multer");
router.post("/", verifyDoctor);
router.post("/signup", doctorController.doctorSignup);
router.post("/login", doctorController.doctorLogin);
router.post(
  "/verify-documents",
  store.any("images"),
  doctorController.verifyDoctorDocuments
);
router.post("/get-doctor-details", doctorController.getDoctorDetails);
router.get("/get-specialization", doctorController.getSpecialization);
router.get("/verify-email/:id", doctorController.verifyDoctorEmail);
router.post("/forgot-password", doctorController.forgotPassword);
router.get(
  "/forgot-password-approve/:id",
  doctorController.forgotPasswordApprove
);
router.post("/new-password", doctorController.newPassword);
router.post("/select-slots", doctorController.selectSlots);
router.post("/doctorDetails", doctorController.doctorDetails);
router.post(
  "/update-profile",
  store.any("images"),
  doctorController.updateProfile
);
router.post("/re-apply", store.any("images"), doctorController.reApply);
router.get("/appointment/:id", doctorController.getAppointments);
router.post("/link",doctorController.setLink);




module.exports = router;
