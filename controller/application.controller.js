const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const createError = require("http-errors");

// id            Int      @id @default(autoincrement())
// userId        Int?
// companyId     Int?
// position      String
// linkToPosting String
// linkToCV      String
// linkToLetter  String
// notes         String

exports.getAllApplications = async (req, res, next) => {
  try {
    //console.log(req.body, req.userId);
    const allApplications = await db.application.findMany({
      where: { userId: req.userId },
      include: {
        Status: { select: { name: true } },
        company: { select: { name: true, homepage: true, logo: true } },
      },
    });
    //console.log(allApplications);
    res.status(200).json(allApplications);
  } catch (err) {
    next(err);
  }
};

exports.getApplication = async (req, res, next) => {
  try {
    const applicationId = Number(req.params.applicationId);
    const application = await db.application.findUnique({
      where: { id: applicationId },
    });
    if (!application.userId === req.userId) {
      throw createError(401);
    }
    const oneApplication = await db.application.findUnique({
      where: { id: applicationId },
      include: { user: { where: { id: req.userId } } },
      include: {
        Status: { select: { name: true } },
        company: { select: { name: true, homepage: true, logo: true } },
      },
    });
    const company = await res.status(200).json(oneApplication);
  } catch (err) {
    next(err);
  }
};

exports.addApplication = async (req, res, next) => {
  // console.log(req.userId);
  // console.log(req.body);
  try {
    const {
      position,
      linkToPosting,
      linkToCV,
      linkToLetter,
      notes,
      statusId,
      companyId,
    } = req.body;
    // const company = await db.company.findUnique({
    //   where: { name: companyName },
    // });
    //todo if the company is new
    const newApplication = await db.application.create({
      data: {
        position,
        linkToPosting,
        linkToCV,
        linkToLetter,
        notes,
        company: { connect: { id: companyId } },
        user: { connect: { id: req.userId } },
        Status: { connect: { id: statusId } },
      },
    });

    res.status(200).json(newApplication);
  } catch (err) {
    next(err);
  }
};

exports.updateApplication = async (req, res, next) => {
  console.log(req.userId);
  const applicationId = Number(req.params.applicationId);
  try {
    const {
      position,
      linkToPosting,
      linkToCV,
      linkToLetter,
      notes,
      statusId,
      companyId,
    } = req.body;
    // const company = await db.company.findUnique({
    //   where: { name: companyName },
    // });
    //todo if the company is new
    const updatedApplication = await db.application.update({
      where: {
        id: applicationId,
      },
      data: {
        position,
        linkToPosting,
        linkToCV,
        linkToLetter,
        notes,
        company: { connect: { id: companyId } },
        user: { connect: { id: req.userId } },
        Status: { connect: { id: statusId } },
      },
    });

    res.status(200).json(updatedApplication);
  } catch (err) {
    next(err);
  }
};

exports.deleteApplication = async (req, res, next) => {
  console.log(req.userId);
  const applicationId = Number(req.params.applicationId);
  try {
    const deletedApplication = await db.application.delete({
      where: {
        id: applicationId,
      },
    });
    res.status(200).json(deletedApplication);
  } catch (err) {
    next(err);
  }
};
