const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const { saveToDatabase, getFilesByFolder } = require('./database');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'upload/' });

app.use(cors());
app.use(express.json());

app.post('/upload/:folderId', upload.single('file'), async (req, res) => {
  try {
    const { folderId } = req.params;
    const file = req.file;
    const dataBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(dataBuffer);

    await saveToDatabase(folderId, file.originalname, pdfData.text);
    fs.unlinkSync(file.path); // clean temp file
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/files/:folderId', async (req, res) => {
  try {
    const { folderId } = req.params;
    const files = await getFilesByFolder(folderId);
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
