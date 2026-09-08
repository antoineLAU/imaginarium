import express from "express";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
const app = express();
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
const rows = db.prepare("SELECT creations.*, users.pseudo FROM creations JOIN users ON users.id = creations.user_id ORDER BY creations.id DESC").all();
res.json(rows);
});
app.post("/register", (req, res) => {
const pseudo = req.body.pseudo;
const email = req.body.email;
const password = req.body.password;
if (!pseudo || !email || !password) {
return res.status(400).json({ error: "pseudo email password obligatoires" });
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
res.json({ id: user.id, pseudo: user.pseudo });
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
app.post("/creations/:id/comments", (req, res) => {
const creation_id = req.params.id;
const user_id = req.body.user_id;
const texte = req.body.texte;
if (!user_id || !texte) {
return res.status(400).json({ error: "user_id texte obligatoires" });
}
const info = db.prepare("INSERT INTO comments (user_id, creation_id, texte) VALUES (?, ?, ?)").run(user_id, creation_id, texte);
res.json({ id: info.lastInsertRowid });
});
app.get("/creations/:id/comments", (req, res) => {
const creation_id = req.params.id;
const rows = db.prepare("SELECT comments.*, users.pseudo FROM comments JOIN users ON users.id = comments.user_id WHERE creation_id = ? ORDER BY comments.id ASC").all(creation_id);
res.json(rows);
});
app.listen(PORT, () => {
console.log("serveur sur http://localhost:3000");
});