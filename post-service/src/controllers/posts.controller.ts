import { Request, Response } from 'express';

interface Post {
  id: number;
  title: string;
}

const posts: Post[] = [];

export function getPosts(req: Request, res: Response) {
  res.json(posts);
}

export function addPost(req: Request, res: Response) {
  const { title } = req.body;

  if (!title) {
    res.json({
      message: 'Missing title',
    });
    return;
  }

  posts.push({
    id: posts.length,
    title,
  });

  res.status(200).json({
    message: 'Post created successfully',
    data: posts[posts.length - 1],
  });
  return;
}
