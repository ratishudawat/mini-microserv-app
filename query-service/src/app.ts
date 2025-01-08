import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Post, Event } from './types';

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

const posts: Post[] = [];

//routes
app.get('/posts', (req: Request, res: Response) => {
  res.json({
    message: 'success',
    posts: posts,
  });
});

app.post('/events', (req: Request, res: Response) => {
  const eventData: Event = req.body;
  console.log(eventData);

  switch (eventData.type) {
    case 'POST_CREATED':
      posts.push({
        ...eventData.payload,
        comments: [],
      });
      break;
    case 'COMMENT_CREATED':
      const { content, postId, id } = eventData.payload;
      const post = posts.find((p) => {
        return postId === p.id;
      });
      if (!post) {
        res.json({
          status: 'error',
          message: 'Post doest exist',
        });
        return;
      } else {
        post.comments.push({ content, id });
      }
      break;
    default:
      console.log('Unhandled event', eventData.type);
  }

  res.json({
    message: 'success',
    data: posts,
  });
});

export default app;
