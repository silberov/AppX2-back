const router = require("express").Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controller/todolist.controller");
//   const {
//     createTodolistValidator,
//     updateTodolistValidator,
//   } = require("../validators/todolist.validators");
//   const authMiddleware = require("../middleware/auth.middleware");

router.get("/", getAllCompanies);
router.get("/:companyId", getCompanyById);
router.post("/", createCompany);
router.put("/:companyId", updateCompany);
router.delete("/:companyId", deleteCompany);
