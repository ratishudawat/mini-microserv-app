import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import { getPosts, addPost } from './controllers/posts.controller';

const app: Application = express();

// Middlewares \
app.use(express.json());
app.use(cors());

// Routes
app.get('/posts', getPosts);
app.post('/posts', addPost);
app.use('/', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    error: '404 Page Not Found',
  });
});

export default app;
