const router = require("express").Router();
const {
  register,
  login,
  getAllusers,
} = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getAllusers);

module.exports = router;

// "email": "blabla@gmail.com",
// "password": "123321"
