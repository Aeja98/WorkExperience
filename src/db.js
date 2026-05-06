const mysql = require("mysql2/promise");

//Create pool- group of reusable MySQL connections for app
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  // Required by many hosted MySQL providers, including Aiven.
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;