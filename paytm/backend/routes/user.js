const express = require("express");
const zod = require("zod");
const router = express.Router();
const { User } = require("../db.users");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const authMiddleWare = require("../middlewares/authMiddleware");
const Account = require("../db.accounts");

const user = zod.object({
  userName: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const result = user.safeParse(req.body);

  if (!result.success) {
    return res.json({ message: "Invalid input" });
  }
  const { userName, firstName, lastName, password } = req.body;

  const existingUser = await User.findOne({ userName });

  if (existingUser) {
    return res.json({ message: "user already exist" });
  }

  const newUser = await User.create({
    userName,
    firstName,
    lastName,
    password,
  });

  if (!newUser) {
    return res.json({ message: "something went wrong can't create new user" });
  }

  const account = await Account.create({
    userId: newUser._id,
    balance: 1 + Math.random() * 1000,
  });

  if (!account) {
    return res
      .status(400)
      .json({ message: "Something went wrong can't create the account" });
  }

  const token = jwt.sign({ newUser }, JWT_SECRET);

  return res.json({ userId: newUser._id, token: token });
});

const signInStrucutre = zod.object({
  userName: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signInStrucutre.safeParse(body);

  if (!success) {
    return res.status(400).json({ message: "unable to signin" });
  }

  const user = await User.findOne({
    userName: body.userName,
    password: body.password,
  });

  if (!user) {
    return res.status(400).json({ message: "unable to find the user" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET);

  // res.setHeader(`Authorization`, `Bearer ${token}`);

  return res.status(200).json({ message: "successfully loggedin", token });
});

const updateStructure = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  password: zod.string().optional(),
});

router.put("/", authMiddleWare, async (req, res) => {
  const { success } = updateStructure.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ message: "invalid input" });
  }

  const modifiedUser = await User.updateOne(
    {
      _id: req.userId,
    },
    req.body
  );

  if (!modifiedUser) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
    ],
  });

  return res.status(200).json(
    users.map((user) => {
      return {
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      };
    })
  );
});
module.exports = router;
