import fs from 'fs';
import { filePath } from './config.js';

export const writeToHistory = (historyItem) => {
  let history = [];

  if (fs.existsSync(filePath)) {
    try {
      history = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      fs.writeFileSync(filePath, JSON.stringify([historyItem, ...history]));
    } catch (err) {
      console.log(err);
    }
  } else {
    history.push(historyItem);
    fs.writeFileSync(filePath, JSON.stringify(history));
  }
};
