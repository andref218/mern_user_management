const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./index");

dotenv.config();

// MongoDB connection
mongoose
  .connect(
    process.env.MONGODB_URI.replace(
      "<DB_PASSWORD>",
      process.env.DATABASE_PASSWORD,
    ),
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
