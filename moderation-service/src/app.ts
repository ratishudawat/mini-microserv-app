import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import { AllEvents } from './types';

const app: Application = express();

app.use(cors());
app.use(express.json());

const FLAGGED_TERMS = ['oranges'];
const containsFlaggedWord = (str: string) => {
  return FLAGGED_TERMS.some((term) => str.includes(term));
};

app.post('/events', async (req: Request, res: Response) => {
  const { type, payload }: AllEvents = req.body;

  if (type === 'COMMENT_CREATED') {
    if (containsFlaggedWord(payload.content)) {
      payload.content = 'This comment is restricted';
      payload.status = 'Rejected';
    } else {
      payload.status = 'Approved';
    }
    await axios
      .post('http://event-broker-srv:4000/events', {
        type: 'COMMENT_MODERATED',
        payload,
      })
      .catch((e) => console.log('Errror occurred - Moderation service'));
  }

  res.json({});
});

export default app;
