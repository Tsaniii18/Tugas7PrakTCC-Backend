import express from "express";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import User from "./models/user_model.js";
import Note from "./models/notes_model.js";
import route from "./routes/route.js";

// Inisialisasi koneksi database
try {
  await db.authenticate();
  console.log("Database connected");
  await User.sync();
  await Note.sync();
} catch (error) {
  console.error("Database connection error:", error);
}

const app = express();

// Middleware untuk handle CORS secara eksplisit
app.use((req, res, next) => {
  const allowedOrigin = "https://fe-notes-115-dot-a-07-451003.uc.r.appspot.com";
  res.header("Access-Control-Allow-Origin", allowedOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Handle preflight
  }

  next();
});

// Middleware lainnya
app.use(cookieParser());
app.use(express.json());
app.use(route);

// Endpoint root
app.get("/", (req, res) => res.send("Backend is running!"));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));
