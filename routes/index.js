const router = require("express").Router();
const companyRoutes = require("./company.routes");

// router.use("/user");
router.use("/company", companyRoutes);
// router.use("/application");
