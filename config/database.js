const { createPool, createConnection } = require("mysql");
require("dotenv").config();

const devDbCredentials = process.env.DB_CREDENTIALS.dev;

const pool = createPool({
  port: devDbCredentials.port,
  host: devDbCredentials.host,
  user: devDbCredentials.user,
  password: devDbCredentials.password,
  insecureAuth: true,
  database: devDbCredentials.database,
  connectionLimit: 10,
});

const connection = createConnection({
  port: devDbCredentials.port,
  host: devDbCredentials.host,
  user: devDbCredentials.user,
  password: devDbCredentials.password,
  insecureAuth: true,
  database: devDbCredentials.database,
  connectionLimit: 10,
});

connection.connect((error) => {
  console.log(`Connecting to database... ${process.env}`);
  if (error) throw error;
  console.log("Database connected successfully.");
});

module.exports = {
  pool,
  connection,
};
