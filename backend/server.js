require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

// Register Route
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, hashedPassword], (err) => {
    if (err) return res.status(400).json({ message: "User already exists" });
    res.json({ message: "User registered successfully" });
  });
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id }, "secretkey", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
