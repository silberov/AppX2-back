const db = require("../config/prisma.config");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const findUserByEmail = async (email) => {
  const user = await db.user.findUnique({ where: { email } });
  return user;
};

//   id          Int           @id @default(autoincrement())
//   name        String
//   email       String        @unique
//   password    String
//   pic         String?
//   CreatedAt   DateTime      @default(now())
//   UpdatedAt   DateTime      @updatedAt

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await findUserByEmail(email);
    if (userExists) {
      throw createError(422, "Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User Created", userId: newUser.id });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw createError(401, "Wrong Email");
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw createError(401, "Wrong Password");
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({ userId: user.id });
  } catch (err) {
    next(err);
  }
};

exports.getAllusers = async (req, res, next) => {
  try {
    console.log(req.userId);
    const allUsers = await db.user.findMany();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};
