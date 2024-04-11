import express from 'express';
import ViteExpress from 'vite-express';

const app = express();
const BASE_URL = 'https://open.er-api.com/v6/latest';

app.get('/currencies', async (req, res) => {
  const { rates } = await fetch(BASE_URL).then((res) => res.json());

  https: res.send(Object.keys(rates));
});

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);
