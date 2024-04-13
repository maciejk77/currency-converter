import fs from 'fs';
import express from 'express';
import ViteExpress from 'vite-express';
import { filePath, API_URL } from './config.js';
import { writeToHistory } from './utils.js';

const app = express();
app.use(express.json());

app.get('/currencies', async (req, res) => {
  const { rates } = await fetch(API_URL).then((res) => res.json());

  res.send(Object.keys(rates));
});

app.get('/currencies/:id', async (req, res) => {
  const { id } = req.params;
  const { rates } = await fetch(`${API_URL}/${id}`).then((res) => res.json());

  res.send(rates);
});

app.get('/history', async (req, res) => {
  if (fs.existsSync(filePath)) {
    const existingData = fs.readFileSync(filePath, 'utf-8');
    res.send(existingData);
  } else {
    res.send([]);
  }
});

app.post('/history', async (req, res) => {
  const historyItem = JSON.stringify(req.body);
  writeToHistory(historyItem);
});

ViteExpress.listen(app, 3000, () => {
  console.log('Server is listening on port 3000...');
});
