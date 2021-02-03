const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

// router.get("/", getAllCompanies);
// router.get("/:companyId", getCompanyById);
// router.post("/", createCompany);
// router.put("/:companyId", updateCompany);
// router.delete("/:companyId", deleteCompany);

exports.getAllCompanies = async (req, res, next) => {
  try {
    const allCompanies = await db.company.findMany();
    res.status(200).json(allCompanies);
  } catch (err) {
    next(err);
  }
};
exports.getCompanyById = async (req, res, next) => {
  try {
    const companyId = Number(req.params.companyId);
    //const todolistId = Number(req.params.todolistId);
    const allCompanies = await db.company.findMany();
    res.status(200).json(allCompanies);
  } catch (err) {
    next(err);
  }
};

exports.getCompanyById = async (req, res, next) => {
  try {
    res.status(200).json(allCompanies);
  } catch (err) {
    next(err);
  }
};
