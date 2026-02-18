const express = require("express");
const cors = require("cors");

const app = express();
const UserRouter = require("./routes/userRoutes");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

//Routes
app.use("/api/v1/users", UserRouter);

module.exports = app;
