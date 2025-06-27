import express from "express";
import { createTodo, updateTodo } from "./type.js";
import { Todo } from "./db.js";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async (req, res) => {
  // complete it

  const respon = createTodo.safeParse(req.body);

  if (!respon.success) {
    return res.status(403).json({ message: "Data is not of valid type" });
  }

  const response = await Todo.create({
    title: req.body.title,
    description: req.body.description,
  });

  return res.status(200).json({ message: "Todo is successfully created" });
});

app.get("/todos", async (req, res) => {
  // complete it

  const response = await Todo.find({});

  return res.status(200).json({ data: response });
});

app.put("/completed", async (req, res) => {
  // completed it

  // console.log(req.body.id);
  const response = updateTodo.safeParse(req.body);

  console.log(response);

  if (!response.success) {
    return res.status(403).json({ message: "Data is not of valid type" });
  }

  await Todo.updateOne(
    {
      _id: req.body.id,
    },
    {
      completed: true,
    }
  );

  return res
    .status(200)
    .json({ message: `Successfully updated the ${req.body.id} ` });
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

mongoose
  .connect(
    `mongodb+srv://PradeepSahuu:PradeepSahuu@cluster0.vkgne.mongodb.net/Todo`
  )
  .then(() => {
    app.listen(8000, () => {
      console.log(`The server is running`);
    });
  });
