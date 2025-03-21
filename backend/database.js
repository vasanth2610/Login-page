const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./users.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) console.error(err);
  else console.log("Connected to SQLite database.");
});

// Create Users Table
db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`
);

module.exports = db;
