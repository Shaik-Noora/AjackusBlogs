const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/blog.db");

db.run(`
CREATE TABLE IF NOT EXISTS blogs(
 id INTEGER PRIMARY KEY AUTOINCREMENT,
 title TEXT,
 content TEXT,
 author TEXT,
 created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
 updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

module.exports = db;