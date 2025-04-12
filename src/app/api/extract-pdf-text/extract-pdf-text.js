import pdfParse from 'pdf-parse';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;
    try {
      const buffer = Buffer.from(file, 'base64');
      const data = await pdfParse(buffer);
      res.status(200).json({ text: data.text });
    } catch (err) {
      console.error('Error parsing PDF:', err);
      res.status(500).json({ error: 'Failed to parse PDF' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
