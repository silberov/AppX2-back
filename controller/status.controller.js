const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();
const createError = require("http-errors");

exports.addStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const newStatus = await db.status.create({
      data: { status },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllStatuses = async (req, res, next) => {
  try {
    const allStatuses = await db.status.findMany();
    res.status(200).json(allStatuses);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const statusId = Number(req.params.statusId);
    const { status } = req.body;
    const updatedStatus = await db.status.update({
      where: { id: statusId },
      data: { status },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteStatus = async (req, res, next) => {
  try {
    const statusId = Number(req.params.statusId);
    const deletedStatus = await db.status.delete({ where: { id: statusId } });
  } catch (err) {
    next(err);
  }
};
