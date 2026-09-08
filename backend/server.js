import express from "express";
import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
const app = express();
const PORT = 3000;
app.use(express.json());
const dbPath = path.join(process.cwd(), "..", "bdd", "database.db");
const schemaPath = path.join(process.cwd(), "..", "bdd", "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf8");
const db = new DatabaseSync(dbPath);
try {
db.exec(schema);
} catch (e) {
}
app.get("/", (req, res) => {
res.json({ message: "imaginarium backend ok" });
});
app.get("/creations", (req, res) => {
const rows = db.prepare("SELECT * FROM creations").all();
res.json(rows);
});
app.listen(PORT, () => {
console.log("serveur sur http://localhost:3000");
});