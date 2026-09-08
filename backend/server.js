import express from "express";
import cors from "cors";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());
const dbPath = path.join(process.cwd(), "..", "bdd", "database.db");
const schemaPath = path.join(process.cwd(), "..", "bdd", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");
const db = new DatabaseSync(dbPath);
db.exec("PRAGMA foreign_keys = ON");
try {
db.exec(schema);
} catch (e) {
}
app.get("/", (req, res) => {
res.json({ message: "imaginarium backend ok" });
});
app.get("/creations", (req, res) => {
const rows = db.prepare("SELECT creations.*, users.pseudo, (SELECT COUNT(*) FROM likes WHERE likes.creation_id = creations.id) AS likes_count, (SELECT COUNT(*) FROM comments WHERE comments.creation_id = creations.id) AS comments_count FROM creations JOIN users ON users.id = creations.user_id ORDER BY creations.id DESC").all();
res.json(rows);
});
app.get("/creations/:id", (req, res) => {
const row = db.prepare("SELECT creations.*, users.pseudo, (SELECT COUNT(*) FROM likes WHERE likes.creation_id = creations.id) AS likes_count, (SELECT COUNT(*) FROM comments WHERE comments.creation_id = creations.id) AS comments_count FROM creations JOIN users ON users.id = creations.user_id WHERE creations.id = ?").get(req.params.id);
if (!row) {
return res.status(404).json({ error: "creation inconnue" });
}
res.json(row);
});
app.post("/register", (req, res) => {
const pseudo = req.body.pseudo;
const email = req.body.email;
const password = req.body.password;
if (!pseudo || !email || !password) {
return res.status(400).json({ error: "pseudo email password obligatoires" });
}
if (pseudo.length < 3) {
return res.status(400).json({ error: "pseudo 3 lettres minimum" });
}
if (!email.includes("@") || !email.includes(".")) {
return res.status(400).json({ error: "email invalide" });
}
if (password.length < 4) {
return res.status(400).json({ error: "password 4 minimum" });
}
const hash = crypto.createHash("sha256").update(password).digest("hex");
try {
const info = db.prepare("INSERT INTO users (pseudo, email, password_hash) VALUES (?, ?, ?)").run(pseudo, email, hash);
res.json({ id: info.lastInsertRowid, pseudo: pseudo });
} catch (e) {
res.status(400).json({ error: "email deja utilise" });
}
});
app.post("/login", (req, res) => {
const email = req.body.email;
const password = req.body.password;
if (!email || !password) {
return res.status(400).json({ error: "email password obligatoires" });
}
const hash = crypto.createHash("sha256").update(password).digest("hex");
const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
if (!user || user.password_hash !== hash) {
return res.status(401).json({ error: "email ou mot de passe faux" });
}
res.json({ id: user.id, pseudo: user.pseudo, role: user.role });
});
app.post("/creations", (req, res) => {
const user_id = req.body.user_id;
const titre = req.body.titre;
const description = req.body.description;
const type = req.body.type;
const contenu_texte = req.body.contenu_texte;
const image_url = req.body.image_url;
if (!user_id || !titre || !description || !type) {
return res.status(400).json({ error: "user_id titre description type obligatoires" });
}
if (titre.length < 3) {
return res.status(400).json({ error: "titre 3 lettres minimum" });
}
if (description.length < 3) {
return res.status(400).json({ error: "description 3 lettres minimum" });
}
if (type !== "texte" && type !== "art" && type !== "dessin" && type !== "illustration") {
return res.status(400).json({ error: "type texte art dessin illustration seulement" });
}
try {
const info = db.prepare("INSERT INTO creations (user_id, titre, description, type, contenu_texte, image_url) VALUES (?, ?, ?, ?, ?, ?)").run(user_id, titre, description, type, contenu_texte, image_url);
res.json({ id: info.lastInsertRowid });
} catch (e) {
res.status(400).json({ error: "type invalide ou utilisateur inconnu" });
}
});
app.post("/creations/:id/like", (req, res) => {
const creation_id = req.params.id;
const user_id = req.body.user_id;
if (!user_id) {
return res.status(400).json({ error: "user_id obligatoire" });
}
try {
const info = db.prepare("INSERT INTO likes (user_id, creation_id) VALUES (?, ?)").run(user_id, creation_id);
res.json({ id: info.lastInsertRowid });
} catch (e) {
res.status(400).json({ error: "deja like" });
}
});
app.delete("/creations/:id/like", (req, res) => {
const creation_id = req.params.id;
const user_id = req.body.user_id;
if (!user_id) {
return res.status(400).json({ error: "user_id obligatoire" });
}
const info = db.prepare("DELETE FROM likes WHERE user_id = ? AND creation_id = ?").run(user_id, creation_id);
res.json({ deleted: info.changes });
});
app.post("/creations/:id/comments", (req, res) => {
const creation_id = req.params.id;
const user_id = req.body.user_id;
const texte = req.body.texte;
if (!user_id || !texte) {
return res.status(400).json({ error: "user_id texte obligatoires" });
}
try {
const info = db.prepare("INSERT INTO comments (user_id, creation_id, texte) VALUES (?, ?, ?)").run(user_id, creation_id, texte);
res.json({ id: info.lastInsertRowid });
} catch (e) {
res.status(400).json({ error: "utilisateur ou creation inconnu" });
}
});
app.get("/creations/:id/comments", (req, res) => {
const creation_id = req.params.id;
const rows = db.prepare("SELECT comments.*, users.pseudo FROM comments JOIN users ON users.id = comments.user_id WHERE creation_id = ? ORDER BY comments.id ASC").all(creation_id);
res.json(rows);
});
app.get("/admin/users", (req, res) => {
const admin_id = req.query.admin_id;
const admin = db.prepare("SELECT * FROM users WHERE id = ?").get(admin_id);
if (!admin || admin.role !== "admin") {
return res.status(403).json({ error: "admin seulement" });
}
const rows = db.prepare("SELECT id, pseudo, email, role, created_at FROM users ORDER BY id ASC").all();
res.json(rows);
});
app.delete("/admin/creations/:id", (req, res) => {
const admin_id = req.query.admin_id;
const admin = db.prepare("SELECT * FROM users WHERE id = ?").get(admin_id);
if (!admin || admin.role !== "admin") {
return res.status(403).json({ error: "admin seulement" });
}
const info = db.prepare("DELETE FROM creations WHERE id = ?").run(req.params.id);
res.json({ deleted: info.changes });
});
app.delete("/admin/comments/:id", (req, res) => {
const admin_id = req.query.admin_id;
const admin = db.prepare("SELECT * FROM users WHERE id = ?").get(admin_id);
if (!admin || admin.role !== "admin") {
return res.status(403).json({ error: "admin seulement" });
}
const info = db.prepare("DELETE FROM comments WHERE id = ?").run(req.params.id);
res.json({ deleted: info.changes });
});
app.put("/admin/users/:id/role", (req, res) => {
const admin_id = req.body.admin_id;
const admin = db.prepare("SELECT * FROM users WHERE id = ?").get(admin_id);
if (!admin || admin.role !== "admin") {
return res.status(403).json({ error: "admin seulement" });
}
const role = req.body.role;
if (role !== "user" && role !== "admin") {
return res.status(400).json({ error: "role user ou admin seulement" });
}
const info = db.prepare("UPDATE users SET role = ? WHERE id = ?").run(role, req.params.id);
res.json({ changed: info.changes });
});
app.listen(PORT, () => {
console.log("serveur sur http://localhost:3000");
});