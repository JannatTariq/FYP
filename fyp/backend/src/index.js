require("../src/models/userModel");
require("../src/models/constructorModel");
const express = require("express");
const bodyParser = require("body-parser");
const requireAtuh = require("../src/middlewares/requireAuth");
const authRoutes = require("../src/routes/authRoute");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(authRoutes);
//connection
dotenv.config({ path: "src/config/config.env" });

mongoose.connect(process.env.DB_URI);
mongoose.connection.on("connected", () => {
  console.log("connected to mongoose instance");
});

mongoose.connection.on("error", (err) => {
  console.error("error connecting to mongo", err);
});

app.get("/", requireAtuh, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(process.env.PORT, () => {
  console.log(`Sever is working on http://localhost:${process.env.PORT}`);
});
