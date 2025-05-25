const { Pool } = require("pg");

// DATABASE_URL=postgres://kifiya:kifiya123@postgres:5432/kifiya // I have this for dockerr

const pool = new Pool({
  user: "kifiya",
  host: "postgres",
  database: "kifiya",
  password: "kifiya123",
  port: 5432,
});

//local
// const pool = new Pool({
//   user: "kifiya",
//   host: "localhost",
//   database: "kifiya",
//   password: "kifiya123",
//   port: 55432,
// });

module.exports = pool;
