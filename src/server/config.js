import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = path.join(__dirname, 'history.json');
const API_URL = 'https://open.er-api.com/v6/latest';

export { filePath, API_URL };
