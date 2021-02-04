const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // req.headers, req.body, req.userId

  //   console.log("log", req.cookies.token);
  if (!req.cookies.token) {
    throw createError(401);
  }
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      throw new Error(err);
    } else {
      req.userId = decoded.id;
      next();
    }
  });
  //   req.userId = 1;
  //   next();
};
