import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { getComments, postComments } from './controllers/comments.controller';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/posts/:id/comments', getComments);
app.post('/posts/:id/comments', postComments);
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'success',
  });
});

export default app;
