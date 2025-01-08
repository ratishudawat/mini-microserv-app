import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import { AllEvents } from './types';

const app = express();

const events: AllEvents[] = [];

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.get('/events', (req: Request, res: Response) => {
  res.json(events);
  return;
});

app.post('/events', (req: Request, res: Response) => {
  events.push(req.body);

  try {
    axios.post('http://localhost:3000/events', req.body).catch((e) => console.error('Post Service unavailable'));
    axios.post('http://localhost:3001/events', req.body).catch((e) => console.error('Comments Service unavailable'));
    axios.post('http://localhost:4002/events', req.body).catch((e) => console.error('Query Service unavailable'));
    axios.post('http://localhost:4003/events', req.body).catch((e) => console.error('Moderation Service unavailable'));
  } catch (e) {
    console.log(e);
  }
  res.json({
    message: 'success',
  });
  return;
});

export default app;
