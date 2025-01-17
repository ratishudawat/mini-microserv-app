import { Request, Response } from 'express';
import axios from 'axios';
import { Comment } from '../types';

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
    status: 'Pending',
  };

  comments.push(newComment);

  axios
    .post('http://event-broker-srv:4000/events', {
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
