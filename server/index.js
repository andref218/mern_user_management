const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();
const UserRouter = require("./routes/userRoutes");
const isDemoMode = process.env.DEMO_MODE === "true";
const ADMIN_TOKEN = process.env.ADMIN_TOKEN;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const demoGuard = (req, res, next) => {
  if (!isDemoMode) return next();

  const token = req.headers["x-admin-token"];
  if (token && token === ADMIN_TOKEN) return next();

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    return res.status(403).json({
      message: "Demo mode enabled. Write operations are disabled.",
    });
  }

  next();
};

app.use(limiter);
app.use(demoGuard);

//Routes
app.use("/api/v1/users", UserRouter);

//Test Route
app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app;
