const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../connections/db");
const redisClient = require("../connections/redisClient");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    const user = result.rows[0];
    if (!user)
      return res.status(403).json({ message: "Authentication failed" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({ message: "Authentication failed" });

    const token = jwt.sign(
      { userId: user.id, username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await redisClient.set(`session:${user.id}`, token, { EX: 3600 });

    const { password: _, ...userData } = user;
    res.json({ token, user: userData });
  } catch (err) {
  console.error("KYC error:", err);
  res.status(500).json({
    error: "Server error",
    code: 500,
  });
}
});

module.exports = router;
