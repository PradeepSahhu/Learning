const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { router } = require("./routes/index");
const userRouter = require("./routes/user");
const AccountRouter = require("./routes/account");

const app = express();
PORT = 3000;
app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  mongoose
    .connect("mongodb://localhost:27017/paytm")
    .then(() => {
      console.log("connected to the database");
    })
    .catch(() => {
      console.log(`unable to connect to the database`);
    });
};

app.use("/api/v1/", router);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/accounts", AccountRouter);

app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on PORT ${PORT}`);
});
