const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../connections/db");
const router = express.Router();

router.post("/", async (req, res) => {
  const { full_name, dateOfBirth, idNumber, phoneNumber, userId } = req.body;

  if (!userId || !idNumber) {
    return res.status(400).json({ message: "All KYC Fields are required" });
  }

  try {
    await pool.query(
      "UPDATE users SET full_name = $1, date_of_birth = $2, id_number = $3, phone_number = $4, isKYCCompleted = $5 WHERE id = $6",
      [full_name, dateOfBirth, idNumber, phoneNumber, true, userId]
    );

    res.status(201).json({ message: "User KYC updated successfully" });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      code: 500,
    });
  }
});

module.exports = router;
