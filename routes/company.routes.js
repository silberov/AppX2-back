const router = require("express").Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/company.controller");

router.get("/", getAllCompanies);
router.get("/:companyId", getCompanyById);
router.post("/", createCompany);
router.put("/:companyId", updateCompany);
router.delete("/:companyId", deleteCompany);

module.exports = router;
