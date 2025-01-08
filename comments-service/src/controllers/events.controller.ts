import { Request, Response } from 'express';
import { Event } from '../types';

export const processEvent = (req: Request, res: Response) => {
  const body: Event = req.body;
  console.log('In comments', body);
  res.json({
    message: 'success',
  });
  return;
};
