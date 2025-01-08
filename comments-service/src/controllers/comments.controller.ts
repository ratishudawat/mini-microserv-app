import { Request, Response } from 'express';
import axios from 'axios';

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

export async function postComments(req: Request, res: Response) {
  const { id: postId } = req.params;
  const { content } = req.body;

  const newComment: Comment = {
    id: comments.length,
    postId: parseInt(postId),
    content,
  };

  comments.push(newComment);

  axios
    .post('http://localhost:4000/events', {
      type: 'COMMENT_CREATED',
      payload: newComment,
    })
    .catch((e) => console.log(e));

  res.json({
    message: 'Success',
    data: comments,
  });
  return;
}
