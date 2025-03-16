const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "db-arturagds.coj0anwp3eq8.us-east-1.rds.amazonaws.com",
  database: "eng",
  password: "senha123",
  port: 5432,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
});

module.exports = pool;
