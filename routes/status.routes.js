const router = require("express").Router();

const {
  addStatus,
  getAllStatuses,
  updateStatus,
  deleteStatus,
} = require("../controller/status.controller");

router.get("/", getAllStatuses);
router.post("/", addStatus);
router.put("/:statusId", updateStatus);
router.delete("/:statusId", deleteStatus);

module.exports = router;
