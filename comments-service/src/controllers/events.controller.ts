import { Request, Response } from 'express';
import { AllEvents, CommentUpdatedEvent } from '../types';
import axios from 'axios';

export const processEvent = async (req: Request, res: Response) => {
  const body: AllEvents = req.body;

  if (body.type === 'COMMENT_MODERATED') {
    const event: CommentUpdatedEvent = {
      type: 'COMMENT_UPDATED',
      payload: body.payload,
    };

    await axios
      .post('http://localhost:4000/events', event)
      .catch((e) => console.log('Error occurred in comments service'));
  }

  res.json({
    message: 'success',
  });
  return;
};
