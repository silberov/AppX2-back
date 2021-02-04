const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error-heandling-middleware");
const app = express();
const mainRouter = require("./routes");

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api", mainRouter);

app.use("*", (req, res, next) => {
  next(createError(404));
});
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
