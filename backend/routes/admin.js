const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const verifyAdmin = require("../middlewares/adminMiddleware");
router.get("/", verifyAdmin);
router.post("/login", adminController.adminLogin);
router.get("/userlist", adminController.userList);
router.post("/blockuser", adminController.blockUser);
router.post("/unblockuser", adminController.unblockUser);
router.get("/doctorlist", adminController.doctorList);
router.post("/doctor-verify", adminController.verifyDoctor);
router.post("/approve-doctor", adminController.approveDoctor);
router.post("/reject-doctor", adminController.rejectDoctor);
router.post("/add-specialization", adminController.addSpecialization);
router.get("/get-specialization", adminController.getSpecialization);
router.post("/edit-specialization", adminController.editSpecialization);
router.post("/delete-specialization", adminController.deleteSpecialization);
router.get("/verified-doctors", adminController.verifiedDoctors);
router.post("/block-doctor", adminController.blockDoctor);
router.post("/unblock-doctor", adminController.unblockDoctor);
router.get("/pending-doctorlist", adminController.pendingDoctorList);




module.exports = router;
