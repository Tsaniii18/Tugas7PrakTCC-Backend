import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import User from "./models/user_model.js";
import Note from "./models/notes_model.js";
import route from "./routes/route.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
    await User.sync();
    await Note.sync();
  } catch (error) {
    console.error("Database error:", error);
  }
})();

const app = express();

const allowedOrigins = [
  'https://fe-notes-115-dot-a-07-451003.uc.r.appspot.com',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());
app.use(express.json());
app.use(route);

app.get("/", (req, res) => res.send("Backend is running!"));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
