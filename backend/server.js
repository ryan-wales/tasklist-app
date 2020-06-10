const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("App has connected to MongoDB");
});

const tasklistRouter = require("./routes/tasklist");

app.use("/tasklist", tasklistRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
