import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import User from "./models/user_model.js";
import Note from "./models/notes_model.js";
import route from "./routes/route.js";

const app = express();

const allowedOrigins = [
  "https://fe-notes-115-dot-a-07-451003.uc.r.appspot.com",
  "http://localhost:3000"
];

// Middleware manual CORS
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Optional: tetap pakai cors untuk fallback/opsional
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use(route);

// Tes koneksi DB
try {
  await db.authenticate();
  console.log('Database connected');
  await User.sync();
  await Note.sync();
} catch (error) {
  console.error(error);
}

app.get("/", (req, res) => res.send("Backend is running!"));
app.listen(5000, () => console.log('Server up and running....'));
