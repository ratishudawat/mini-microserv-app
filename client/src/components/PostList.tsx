import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Post from './Post';
import { Post as PostType } from '../types';

const PostList = (): JSX.Element => {
  const [posts, setPosts] = useState<PostType[] | []>([]);

  const getPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('http://localhost:4002/posts');
      console.log(data.posts);
      setPosts(data.posts);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      return;
    }
    getPosts();
  }, []);

  return (
    <ul>
      {posts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
