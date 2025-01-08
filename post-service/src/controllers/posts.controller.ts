import { Request, Response } from 'express';
import axios from 'axios';
import { Post } from '../types';

const posts: Post[] = [];

export function getPosts(req: Request, res: Response) {
  res.json(posts);
}

export async function addPost(req: Request, res: Response) {
  const { title } = req.body;

  if (!title) {
    res.json({
      message: 'Missing title',
    });
    return;
  }

  const newPost: Post = {
    id: posts.length,
    title,
    comments: [],
  };

  posts.push(newPost);

  axios
    .post('http://localhost:4000/events', {
      type: 'POST_CREATED',
      payload: newPost,
    })
    .catch((e) => console.log(e));

  res.status(200).json({
    message: 'Post created successfully',
    data: posts[posts.length - 1],
  });
  return;
}
