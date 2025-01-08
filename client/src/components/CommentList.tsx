import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

type CommentListProps = {
  postId: number;
};

type Comment = {
  id: number;
  postId: number;
  content: string;
};

const CommentList = ({ postId }: CommentListProps): JSX.Element => {
  const [comments, setComments] = useState<Comment[] | []>([]);

  const getComments = useCallback(async () => {
    const { data } = await axios.get(`http://localhost:3001/posts/${postId}/comments`);
    console.log(data);
    setComments(data.data);
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      return;
    }
    getComments();
  }, []);

  return (
    <div>
      <p>Comments:</p>
      <ol>
        {comments.map((comment) => {
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ol>
    </div>
  );
};

export default CommentList;
