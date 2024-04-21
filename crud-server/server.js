// server.js

// Import required modules
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Create express app
const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Create table for people if not exists
db.run(`CREATE TABLE IF NOT EXISTS people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstName TEXT,
  middleName TEXT,
  lastName TEXT,
  deadOrAlive TEXT,
  nextOfKin TEXT,
  idNumber TEXT
)`);

// Create table for user profiles if not exists
db.run(`CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  age INTEGER,
  FOREIGN KEY (userId) REFERENCES people(id)
)`);

// Get all people
app.get('/api/people', (req, res) => {
  db.all('SELECT * FROM people', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get person by ID
app.get('/api/people/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM people WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Person not found' });
    } else {
      res.json(row);
    }
  });
});

// Add new person
app.post('/api/people', (req, res) => {
  const { firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber } = req.body;
  db.run('INSERT INTO people (firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber) VALUES (?, ?, ?, ?, ?, ?)', 
         [firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: this.lastID, firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber });
    }
  });
});

// Update person by ID
app.put('/api/people/:id', (req, res) => {
  const { id } = req.params;
  const { firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber } = req.body;
  db.run('UPDATE people SET firstName = ?, middleName = ?, lastName = ?, deadOrAlive = ?, nextOfKin = ?, idNumber = ? WHERE id = ?', 
         [firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber, id], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id, firstName, middleName, lastName, deadOrAlive, nextOfKin, idNumber });
    }
  });
});

// Delete person by ID
app.delete('/api/people/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM people WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Person deleted successfully' });
    }
  });
});

// Get all profiles
app.get('/api/profiles', (req, res) => {
  db.all('SELECT * FROM profiles', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Get profile by ID
app.get('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM profiles WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(404).json({ error: 'Profile not found' });
    } else {
      res.json(row);
    }
  });
});

// Add new profile
app.post('/api/profiles', (req, res) => {
  const { userId, age } = req.body;
  db.run('INSERT INTO profiles (userId, age) VALUES (?, ?)', [userId, age], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id: this.lastID, userId, age });
    }
  });
});

// Update profile by ID
app.put('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  const { userId, age } = req.body;
  db.run('UPDATE profiles SET userId = ?, age = ? WHERE id = ?', [userId, age, id], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ id, userId, age });
    }
  });
});

// Delete profile by ID
app.delete('/api/profiles/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM profiles WHERE id = ?', [id], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: 'Profile deleted successfully' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
