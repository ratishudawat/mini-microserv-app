import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

//routes
app.post('/events', (req: Request, res: Response) => {
  console.log(req.body);
  try {
    axios.post('http://localhost:3000/events', req.body);
    axios.post('http://localhost:3001/events', req.body);
  } catch (e) {
    console.log(e);
  }
});

export default app;
