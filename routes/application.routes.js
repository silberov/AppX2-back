const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllApplications,
  deleteApplication,
  updateApplication,
  addApplication,
} = require("../controller/application.controller");

router.get("/", getAllApplications);
router.post("/", addApplication);
router.put("/:applicationId", updateApplication);
router.delete("/:applicationId", deleteApplication);

module.exports = router;
