import express from "express";

import jwt from "jsonwebtoken";

const PASSWORD = "123123123";

const ALL_USERS = [
  {
    username: "PradeepSahu",
    password: "Pradeep@123",
  },
  {
    username: "RitikSahu",
    password: "Ritik@123",
  },
  {
    username: "SumitSahu",
    password: "Sumit@123",
  },
];

const userExist = (username, password) => {
  const user = ALL_USERS.find(
    (user) => user.username == username && user.password === password
  );

  if (!user) {
    return false;
  }

  return true;
};

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(400).json({ msg: "Route working" });
});

app.post("/singin", (req, res) => {
  const { username, password } = req.body;

  if (!userExist(username, password)) {
    return res.status(404).json({ msg: "user not found" });
  }

  const token = jwt.sign({ username: username }, PASSWORD);
  console.log(token);

  return res.status(200).json({ token: token });
});

app.get("/getAllUsers", (req, res) => {
  const token = req.headers.authorization;

  const realtoken = token.split(" ");

  console.log("the token is : ", realtoken[1]);

  //use verify

  const response = jwt.verify(realtoken[1], PASSWORD);

  if (!response) {
    return res.status(404).json({ msg: "Unauthorized" });
  }

  return res.status(200).json({ data: ALL_USERS });
});

app.listen(3000);
