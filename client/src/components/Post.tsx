import { FormEventHandler, useRef } from 'react';
import CommentList from './CommentList';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
};

type PostProps = {
  post: Post;
};

const Post = ({ post }: PostProps) => {
  const commentInputRef = useRef<HTMLInputElement | null>(null);

  const submitComment: FormEventHandler = (e) => {
    e.preventDefault();
    if (commentInputRef.current) {
      const comment = commentInputRef.current.value;
      axios
        .post(
          `http://localhost:3001/posts/${post.id}/comments`,
          {
            content: comment,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((res) => {
          console.log(res);
          if (commentInputRef.current) commentInputRef.current.value = '';
        })
        .catch(console.error);
    }
  };

  return (
    <li key={post.id}>
      <span>{post.title}</span>
      <CommentList postId={post.id} />
      <form onSubmit={submitComment}>
        <input ref={commentInputRef} type='text' />
        <button>Submit</button>
      </form>
    </li>
  );
};

export default Post;
