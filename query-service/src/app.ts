import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Post, Event } from './types';

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

const posts: Post[] = [];

export function processEvent(event: Event) {
  switch (event.type) {
    case 'POST_CREATED':
      posts.push({
        ...event.payload,
        comments: [],
      });
      break;
    case 'COMMENT_CREATED':
      const { content, postId, id } = event.payload;
      const post = posts.find((p) => {
        return postId === p.id;
      });
      if (!post) {
        return {
          status: 'error',
          message: 'Post doest exist',
        };
      } else {
        post.comments.push({ content, id });
      }
      break;
    default:
      console.log('Unhandled event', event.type);
  }
  return {
    message: 'success',
    data: posts,
  };
}

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
  const result = processEvent(eventData);
  res.json(result);
});

export default app;
