const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const todoRoutes = require("./routes/todoRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", todoRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to Database!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("Error: ", err));
