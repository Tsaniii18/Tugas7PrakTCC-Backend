import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import User from "./models/user_model.js";
import Note from "./models/notes_model.js";
import route from "./routes/route.js";

const app = express();

const allowedOrigin = 'https://a-07-451003.uc.r.appspot.com';

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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