import "dotenv/config";
import "../scripts/ensureBuild.js";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MindEase API running on port ${PORT}`);
  connectDB();
});
