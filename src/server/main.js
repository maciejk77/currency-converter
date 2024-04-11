import express from 'express';
import ViteExpress from 'vite-express';

const BASE_URL = 'https://open.er-api.com/v6/latest';
const app = express();

app.get('/currencies', async (req, res) => {
  const { rates } = await fetch(BASE_URL).then((res) => res.json());

  res.send(Object.keys(rates));
});

app.get('/currencies/:id', async (req, res) => {
  const { id } = req.params;
  const { rates } = await fetch(`${BASE_URL}/${id}`).then((res) => res.json());

  res.send(rates);
});

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);
