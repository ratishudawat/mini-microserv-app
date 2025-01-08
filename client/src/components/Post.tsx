import { FormEventHandler, useRef } from 'react';
import axios from 'axios';
import { Post as PostType } from '../types';

type PostProps = {
  post: PostType;
};

const Post = ({ post }: PostProps) => {
  console.log(post);
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
      <div>
        <p>Comments:</p>
        <ol>
          {post.comments.map((comment) => {
            if (comment.status == 'Pending') return <li key={comment.id}>This comment is under moderation</li>;
            else return <li key={comment.id}>{comment.content}</li>;
          })}
        </ol>
      </div>

      <form onSubmit={submitComment}>
        <input ref={commentInputRef} type='text' />
        <button>Submit</button>
      </form>
    </li>
  );
};

export default Post;
