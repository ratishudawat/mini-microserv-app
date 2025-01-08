import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

type Event = {
  type: 'POST_CREATED' | 'COMMENT_CREATED';
  payload: any;
};

const events: Event[] = [];

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.get('/events', (req: Request, res: Response) => {
  res.json(events);
  return;
});

app.post('/events', (req: Request, res: Response) => {
  console.log(req.body);
  events.push(req.body);

  try {
    axios.post('http://localhost:3000/events', req.body).catch((e) => console.error('Post Service unavailable'));
    axios.post('http://localhost:3001/events', req.body).catch((e) => console.error('Comments Service unavailable'));
    axios.post('http://localhost:4002/events', req.body).catch((e) => console.error('Query Service unavailable'));
  } catch (e) {
    console.log(e);
  }
  res.json({
    message: 'success',
  });
  return;
});

export default app;
