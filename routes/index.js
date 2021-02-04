const router = require("express").Router();
const companyRoutes = require("./company.routes");
const authRoutes = require("./auth.routes");
const applicationRoutes = require("./application.routes");
const statusRoutes = require("./status.routes");
const authMiddleware = require("../middleware/auth.middleware");

router.get("/", (req, res, next) => {
  res.json({ message: "welcome to AppX2 API" });
});

router.use("/auth", authRoutes);
router.use("/company", authMiddleware, companyRoutes);
router.use("/application", authMiddleware, applicationRoutes);
router.use("/status", authMiddleware, statusRoutes);

module.exports = router;
