const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Connect to SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middleware
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Create tables if not exists
db.run(`CREATE TABLE IF NOT EXISTS people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  middleName TEXT,
  lastName TEXT,
  deadOrAlive TEXT,
  nextOfKin TEXT,
  idNumber TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  age INTEGER,
  FOREIGN KEY (userId) REFERENCES people(id)
)`);

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  password TEXT,
  role TEXT
)`);

// CRUD operations for people table
app.get('/api/people', (req, res) => {
  db.all('SELECT * FROM people', (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

// CRUD operations for profiles table
app.get('/api/profiles', (req, res) => {
  db.all('SELECT * FROM profiles', (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

// CRUD operations for users table
app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
