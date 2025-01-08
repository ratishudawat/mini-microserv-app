import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { Post, AllEvents } from './types';

const app: Application = express();

//middlewares
app.use(cors());
app.use(express.json());

const posts: Post[] = [];

export function processEvent(event: AllEvents) {
  switch (event.type) {
    case 'POST_CREATED':
      posts.push({
        ...event.payload,
        comments: [],
      });
      break;
    case 'COMMENT_CREATED':
      const commentData = event.payload;
      const post = posts.find((p) => {
        return commentData.postId === p.id;
      });
      if (!post) {
        return {
          status: 'error',
          message: 'Post doest exist',
        };
      } else {
        post.comments.push(commentData);
      }
    case 'COMMENT_UPDATED':
      const { postId, id, content, status } = event.payload;
      const targetPost = posts.find((p) => p.id === postId);
      if (targetPost) {
        const targetComment = targetPost.comments.find((comment) => comment.id === id);
        if (targetComment) {
          targetComment.content = content;
          targetComment.status = status;
        }
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
  const eventData: AllEvents = req.body;
  console.log(eventData);
  const result = processEvent(eventData);
  res.json(result);
});

export default app;
