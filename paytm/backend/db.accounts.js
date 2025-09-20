const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: number,
    required: true,
    default: 0,
  },
});

export const Account = mongoose.model("Account", AccountSchema);
