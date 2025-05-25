const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../connections/db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { amount, date, type, user_id } = req.body;

  if (!user_id || !amount) {
    return res
      .status(400)
      .json({ message: "All Transaction Fields are required" });
  }

  try {
    await pool.query(
      "INSERT INTO transactions (amount, date, metadata, type, user_id) VALUES ($1, $2,$3, $4, $5)",
      [amount, date, req.body, type, user_id]
    );

    res.status(201).json({ message: "Transaction created successfully" });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
