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
    const allApplications = await db.application.findMany({
      where: { userId: req.userId },
    });
    res.status(200).json(allApplications);
  } catch (err) {
    next(err);
  }
};

exports.addApplication = async (req, res, next) => {
  console.log(req.userId);
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
        // status: { connect: { id: statusId } },
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
      companyName,
    } = req.body;
    const company = await db.company.findUnique({
      where: { name: companyName },
    });
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
        company: { connect: { id: company.id } },
        user: { connect: { id: req.userId } },
        status: { connect: { id: statusId } },
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
