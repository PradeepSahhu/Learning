const express = require("express");
const mongoose = require("mongoose");
const authMiddleWare = require("../middlewares/authMiddleware");
const { Account } = require("../db.accounts");
const zod = require("zod");

const router = express.Router();

router.get("/balance", authMiddleWare, async (req, res) => {
  const userAccount = await Account.findOne({ userId: req.userId });

  if (!userAccount) {
    return res.status(400).json({ message: "Can't find the account" });
  }

  return res.status(200).json({
    message: "Successfully found balance",
    balance: userAccount.balance,
  });
});

const transferStructure = zod.object({
  to: zod.string(),
  amount: zod.number().positive(),
});

router.post("/transfer", authMiddleWare, async (req, res) => {
  const status = transferStructure.safeParse(req.body);

  if (!status.success) {
    return res.status(400).json({ message: "Invalid data type" });
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const { to, amount } = status.data;

      const account = await Account.findOne({ userId: req.userId }).session(
        session
      );

      if (!account) {
        throw new Error("SENDER_NOT_EXIST");
      }

      if (account.balance < amount) {
        throw new Error("INSUFFICIENT_BALANCE");
      }

      const isUserExit = await Account.findOne({ userId: to }).session(session);

      if (!isUserExit) {
        throw new Error("RECEIPENT_NOT_EXIST");
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
      ).session(session);

      await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } }
      ).session(session);
    });
    return res.status(200).json({ message: "Transaction completed" });
  } catch (error) {
    if (error.message === "INSUFFICIENT_BALANCE") {
      return res.status(404).json({ message: "INSUFFICIENT_BALANCE" });
    } else if (error.message === "RECEIPENT_NOT_EXIST") {
      return res.status(404).json({ message: "RECEIPENT_NOT_EXIST" });
    } else if (error.message === "SENDER_NOT_EXIST") {
      return res.status(404).json({ message: "SENDER_NOT_EXIST" });
    }
  } finally {
    session.endSession();
  }
});

module.exports = router;
