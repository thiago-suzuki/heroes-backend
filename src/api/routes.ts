import { knightApp } from '../modules/knight/knight.routes';
import { Router } from 'express';

const bodyParser = require('body-parser');

const app = Router();
app.use(bodyParser.json());

app.use([
    knightApp
]);

app.get('/api/ping', (req, res) =>
  res.status(200).json({
    message: 'Running! ⚡️',
  }),
);

export { app };
