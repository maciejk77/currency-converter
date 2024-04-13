import express from 'express';
import ViteExpress from 'vite-express';

import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'history.json');
const API_URL = 'https://open.er-api.com/v6/latest';
const app = express();

const writeToHistory = (incomingData) => {
  let history = [];

  if (fs.existsSync(filePath)) {
    try {
      history = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fs.writeFileSync(filePath, JSON.stringify([incomingData, ...history]));
    } catch (err) {
      console.log(err);
    }
  } else {
    history.push(incomingData);
    fs.writeFileSync(filePath, JSON.stringify(history));
  }
};

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
  const incomingData = JSON.stringify(req.body);
  writeToHistory(incomingData);
});

ViteExpress.listen(app, 3000, () => {
  console.log('Server is listening on port 3000...');
});
