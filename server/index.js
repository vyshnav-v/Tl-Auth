import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "tlAuth",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});
app.post("/register", (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (password !== confirmPassword) {
    res.send({ message: "Passwords do not match" });
  } else {
    // Check if the user already exists
    connection.query(
      `SELECT * FROM users WHERE email = '${email}'`,
      (err, result) => {
        if (err) {
          throw err;
        }

        if (result.length > 0) {
          res.send({message:"User already exists"});
        } else {
          // Hash the password
          bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
              throw err;
            }

            // Insert the user into the database
            connection.query(
              `INSERT INTO users (username,email, password) VALUES ('${username}','${email}' ,'${hash}')`,
              (err, result) => {
                if (result) {
                  res.status(201).send({message:"User registered"});
                } else {
                  throw err;
                }
              }
            );
          });
        }
      }
    );
  }
});
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //   connection.query(
  //     "SELECT * FROM users WHERE email =? AND password =?",
  //     [email, password],
  //     (err, result) => {
  //       if (err) {
  //         res.send({ err: err });
  //       } else {
  //         if (result.length > 0) {
  //           res.send(result);
  //         } else {
  //           res.send({ message: "Invalid Email and Password" });
  //         }
  //       }
  //     }
  //   );
  // Check if the user exists
  connection.query(
    `SELECT * FROM users WHERE email = '${email}'`,
    (err, result) => {
      if (err) {
        throw err;
      }

      if (result.length === 0) {
        res.send({message:"Invalid credentials"});
      } else {
        // Compare the password with the hashed password
        bcrypt.compare(password, result[0].password, (err, match) => {
          if (err) {
            throw err;
          }

          if (match) {
            // Generate a JWT token
            const token = jwt.sign({email }, "secret", { expiresIn: "1h" });
            res.send({ token });
          } else {
            res.send({message:"password Invalid "});
          }
        });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
