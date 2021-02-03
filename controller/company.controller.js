const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const findCompanyById = async (id) => {
  const company = await db.company.findUnique({ where: { id } });
  return company;
};

const findCompanyByName = async (name) => {
  const company = await db.company.findFirst({ where: { name } });
  return company;
};

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
    const company = await db.company.findMany();
    res.status(200).json(company);
  } catch (err) {
    next(err);
  }
};

exports.createCompany = async (req, res, next) => {
  try {
    const { name, logo, homepage } = req.body;
    if (findCompanyByName(name)) {
      throw createError(422, "a copmany with that name already exists");
    }
    const newCompany = await db.company.create({
      name,
      logo,
      homepage,
      UpdatedAt: new Date().toISOString(),
    });
    res.status(200).json(newCompany);
  } catch (err) {
    next(err);
  }
};

exports.updateCompany = async (req, res, next) => {
  try {
    const companyId = Number(req.params.companyId);
    const companyUpdate = await findCompanyById(companyId);
    if (!companyUpdate) {
      throw createError(404, "Company not Found");
    }
    const { name, logo, homepage } = req.body;
    const updatedCompany = await db.company.update({
      name,
      logo,
      homepage,
      UpdatedAt: new Date().toISOString(),
    });
    res.status(200).json(updatedCompany);
  } catch (err) {
    next(err);
  }
};

exports.deleteCompany = async (req, res, next) => {
  try {
    const companyId = Number(req.params.companyId);
    const companyDelete = await findCompanyById(companyId);
    if (!companyDelete) {
      throw createError(404, "company not Found");
    }
    const deletedCompany = await db.company.delete({
      where: {
        id: companyId,
      },
    });
    res.status(200).json(deletedCompany);
  } catch (err) {
    next(err);
  }
};
