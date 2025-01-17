import { Request, Response } from 'express';
import { AllEvents } from '../types';

export const processEvent = (req: Request, res: Response) => {
  const body: AllEvents = req.body;
  console.log('Event received', body);

  res.json({
    message: 'success',
  });
  return;
};
