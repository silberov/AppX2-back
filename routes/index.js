const router = require("express").Router();
const companyRoutes = require("./company.routes");

router.get("/", (req, res, next) => {
  res.json({ message: "welcome" });
});

// router.use("/user");
router.use("/company", companyRoutes);
// router.use("/application");

module.exports = router;
