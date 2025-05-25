const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../connections/db");
const redisClient = require("../connections/redisClient");
const router = express.Router();

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Auth Token si required", code: 401 });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token", code: 403 });
  }
};

router.get("/", async (req, res) => {
  const user_id = req.query.user_id;

  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [user_id]
    );
    const transactions = result.rows;

    await redisClient.set(
      `transactions:${user_id}`,
      JSON.stringify(transactions), // <-- serialize here
      {
        EX: 3600,
      }
    );

    res.json({ transactions, user_id });
  } catch (err) {
    res.status(500).json({
      error: "Server error",
      code: 500,
    });
  }
});

module.exports = router;
