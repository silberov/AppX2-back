const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllApplications,
  deleteApplication,
  updateApplication,
  addApplication,
  getApplication,
} = require("../controller/application.controller");

router.get("/", getAllApplications);
router.get("/:applicationId", getApplication);
router.post("/", addApplication);
router.put("/:applicationId", updateApplication);
router.delete("/:applicationId", deleteApplication);

module.exports = router;
