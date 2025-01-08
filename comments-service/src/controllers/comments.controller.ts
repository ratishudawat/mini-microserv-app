import { Request, Response } from 'express';

type Comment = {
  id: number;
  postId: number;
  content: string;
};

const comments: Comment[] = [];

export function getComments(req: Request, res: Response) {
  const { id: postId } = req.params;
  const commentsByPostId = comments.filter((comment) => {
    return comment.postId == parseInt(postId);
  });

  res.json({
    message: 'success',
    data: commentsByPostId,
  });
}

export function postComments(req: Request, res: Response) {
  const { id: postId } = req.params;
  const { content } = req.body;

  comments.push({
    id: comments.length,
    postId: parseInt(postId),
    content,
  });

  res.json({
    message: 'Success',
    data: comments,
  });
  return;
}
