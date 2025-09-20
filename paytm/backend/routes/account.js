const express = require("express");
const authMiddleWare = require("../middlewares/authMiddleware");
const { User } = require("../db.users");
const { Account } = require("../db.accounts");

const router = express.Router();

router.post("/transfer", authMiddleWare, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();

    const { to, amount } = req.body;

    // fetch the account within the transaction

    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      session.abortTransaction();
      return res.status(400).json({ message: "Insufficient Balance" });
    }

    const isUserExit = await Account.findOne({ userId: to }).session(session);

    if (!isUserExit) {
      session.abortTransaction();

      return res.status(400).json({ message: "Recepient not found" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);

    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    await session.commitTransaction();

    return res.status(200).json({ message: "Transaction completed" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
