const express = require("express");
const app = express();
const router = express.Router();

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const userData = require("./Models/UserModel");
const mongoose = require("mongoose");

mongoose
.connect(process.env.URI)
.then(() => {
  console.log("Connected Successfully");
  app.listen(process.env.PORT || 5000, (err) => {
    if (err) console.log(err);
    console.log(`running at port ${process.env.PORT}`);
  });
})
.catch((error) => console.log("Failed to connect", error));

app.get("/", (req, res) => {
  res.send("api running");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, age } = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await userData.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userData.findById({ _id: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

outer.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;

  try {
    const updatedUser = await userData.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }


  app.use(userDataRoute);

