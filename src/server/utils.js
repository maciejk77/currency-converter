import fs from 'fs';
import { filePath } from './config.js';

export const writeToHistory = (historyItem) => {
  if (fs.existsSync(filePath)) {
    try {
      const history = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fs.writeFileSync(filePath, JSON.stringify([historyItem, ...history]));
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      fs.writeFileSync(filePath, JSON.stringify([historyItem]));
    } catch (err) {
      console.log(err);
    }
  }
};
