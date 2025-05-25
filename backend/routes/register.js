const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../connections/db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (username, password, isKYCCompleted) VALUES ($1, $2, $3)",
      [username, hashedPassword, false]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    if (err.code === "23505") {
      return res
        .status(409)
        .json({ error: "Username already exists", code: 409 });
    }
    res.status(500).json({ error: "Server error", code: 500 });
  }
});

module.exports = router;
