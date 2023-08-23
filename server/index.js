import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mysql from "mysql2";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jena@1234",
  database: "test",
});

app.get("/", (req, res) => {
  res.send("Hello this is my server");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, result) => {
    if (err) return res.json(err);

    return res.json(result);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`,`cover`,`price`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [bookId], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `cover`= ?, `price`= ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
    bookId,
  ];
  db.query(q, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
