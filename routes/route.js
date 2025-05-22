import express from "express";
import * as notes_controller from "../controllers/notes_controller.js";
import * as user_controller from "../controllers/user_controller.js";
import { verifyToken } from "../middleware/verify_token.js";
import { refreshToken } from "../controllers/refresh_token.js";

const router = express.Router();


// router.get('/note', notes_controller.getNote);
// router.get('/note/:id',  notes_controller.getNoteById);
// router.post('/note', notes_controller.createNote);
// router.patch('/note/:id', notes_controller.updateNote);
// router.delete('/note/:id', notes_controller.deleteNote);

router.get('/note', verifyToken, notes_controller.getNote);
router.get('/note/:id', verifyToken,  notes_controller.getNoteById);
router.post('/note', verifyToken, notes_controller.createNote);
router.patch('/note/:id', verifyToken, notes_controller.updateNote);
router.delete('/note/:id', verifyToken, notes_controller.deleteNote);

router.get("/users/:id", verifyToken, user_controller.getUserById);
router.get("/token", refreshToken);
router.post("/users", user_controller.register);
router.post("/login", user_controller.login);
router.delete("/logout", user_controller.logout);

export default router;