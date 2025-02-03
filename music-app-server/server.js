const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'yourUsername', // Replace with your MySQL username
    password: 'yourPassword', // Replace with your MySQL password
    database: 'music_app', // Replace with your database name
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Example: Save music notes
app.post('/api/notes', (req, res) => {
    const { title, notes } = req.body;
    const query = 'INSERT INTO notes (title, notes) VALUES (?, ?)';
    db.query(query, [title, notes], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ message: 'Note saved successfully!' });
    });
});

// Example: Get all notes
app.get('/api/notes', (req, res) => {
    db.query('SELECT * FROM notes', (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
