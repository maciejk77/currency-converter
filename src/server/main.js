import express from 'express';
import ViteExpress from 'vite-express';

// import fs from 'fs';
// import path from 'path';

// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const filePath = path.join(__dirname, 'history.json');
const BASE_URL = 'https://open.er-api.com/v6/latest';
const app = express();

app.use(express.json());

app.get('/currencies', async (req, res) => {
  const { rates } = await fetch(BASE_URL).then((res) => res.json());

  res.send(Object.keys(rates));
});

app.get('/currencies/:id', async (req, res) => {
  const { id } = req.params;
  const { rates } = await fetch(`${BASE_URL}/${id}`).then((res) => res.json());

  res.send(rates);
});

// app.get('/history', async (req, res) => {
//   const existingData = fs.readFileSync(filePath, 'utf-8');
//   console.log(existingData);
//   res.send(existingData);
// });

// app.post('/history', async (req, res) => {
//   const incomingData = JSON.stringify(req.body);

//   try {
//     fs.writeFileSync(filePath, incomingData);
//   } catch (error) {
//     console.error('Error writing JSON data to file: ', error);
//   }
// });

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);
