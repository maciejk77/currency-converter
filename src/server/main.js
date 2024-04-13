import fs from 'fs';
import express from 'express';
import ViteExpress from 'vite-express';
import { filePath, API_URL } from './config.js';
import { writeToHistory } from './utils.js';

const app = express();
app.use(express.json());

app.get('/currencies', async (req, res) => {
  try {
    const response = await fetch(API_URL);
    const { rates } = await response.json();

    res.status(200).send(Object.keys(rates));
  } catch {
    console.error(err);
    res.status(500).send('Error fetching currencies');
  }
});

app.get('/currencies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`${API_URL}/${id}`);
    const { rates } = await response.json();

    res.status(200).send(rates);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error fetching rates for ${id}`);
  }
});

app.get('/history', (req, res) => {
  try {
    if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath, 'utf-8');
      res.status(200).send(existingData);
    } else {
      res.status(200).send([]);
    }
  } catch (err) {
    res.status(500).send(`Error fetching history data`);
  }
});

app.post('/history', (req, res) => {
  try {
    const historyItem = JSON.stringify(req.body);
    writeToHistory(historyItem);
    res.status(200).send('Item added to history');
  } catch (err) {
    res.status(500).send(`Error while adding history to DB`);
  }
});

ViteExpress.listen(app, 3000, () => {
  console.log('Server is listening on port 3000...');
});
