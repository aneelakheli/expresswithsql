const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port:"3307",
  user: "root",
  password: "",
  database: "backend",
});

connection.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("Connected!.");
  }
});

process.on('exit', () => {
  db.end(); // Close the MySQL connection
});

module.exports = connection;
