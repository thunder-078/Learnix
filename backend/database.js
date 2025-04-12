const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(path.join(__dirname, 'pdfdata.db'));

const fs = require('fs');
const path = require('path');

if (!fs.existsSync('upload')) {
  fs.mkdirSync('upload');
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    folder TEXT,
    filename TEXT,
    content TEXT
  )`);
});

function saveToDatabase(folder, filename, content) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO files (folder, filename, content) VALUES (?, ?, ?)',
      [folder, filename, content],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function getFilesByFolder(folder) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM files WHERE folder = ?', [folder], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { saveToDatabase, getFilesByFolder };
