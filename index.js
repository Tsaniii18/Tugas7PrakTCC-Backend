import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import User from "./models/user_model.js";
import Note from "./models/notes_model.js";
import route from "./routes/route.js";

const app = express();


const corsOptions = {
  origin: [
    'https://a-07-451003.uc.r.appspot.com',
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(cookieParser());
app.use(express.json());
app.use(route);

try {
  await db.authenticate();
  console.log('Databse connected');
  await User.sync();
  await Note.sync();
} catch (error) {
  console.error(error);
}

app.listen(5000, '0.0.0.0', () => console.log('Server up and running....'));

// app.set("view engine", "ejs");
// app.get("/", (req, res) => res.render("index"));

app.get("/", (req, res) => res.send("Backend is running!"));