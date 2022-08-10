const sqlite3 = require("sqlite3").verbose();
const { Password } = require("@mui/icons-material");
var md5 = require("md5");
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    //can not open database
    throw err;
  } else {
    console.log("connected to the Sqlite database");
    //connected to the sqlite data base now you can create tablet here
    const dbname = "user";
    db.run(
      `CREATE TABLE ${dbname} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name text,
        email text UNIQUE,
        password text,
        CONSTRAINT email_unique UNIQUE (email))`,
      (err) => {
        if (err) {
          console.log(`Table '${dbname}' already exited`);
          //   const users = [
          //     { name: "erfan", email: "erfan@gmail.com", password: "123456" },
          //     { name: "dan", email: "dan@gmail.com", password: "123" },
          //     { name: "jimy", email: "jimy@gmail.com", password: "12345" },
          //   ];
          //   users.forEach((user) => {
          //     var insertQuery = `INSERT INTO user (name,email,password) VALUES(?,?,?)`;
          //     db.run(insertQuery, [user.name, user.email, md5(user.password)]);
          //   });
        } else {
          console.log("insert some rows");
          //create some rows
          const users = [
            { name: "erfan", email: "erfan@gmail.com", password: "123456" },
            { name: "dan", email: "dan@gmail.com", password: "123" },
            { name: "jimy", email: "jimy@gmail.com", password: "12345" },
          ];
          users.forEach((user) => {
            var insertQuery = `INSERT INTO user (name,email,password) VALUES(?,?,?)`;
            db.run(insertQuery, [user.name, user.email, md5(user.password)]);
          });
        }
      }
    );
  }
});

module.exports = db;
