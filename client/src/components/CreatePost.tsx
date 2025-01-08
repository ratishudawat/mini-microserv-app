import { useRef, FormEventHandler } from 'react';
import axios from 'axios';

const CreatePost = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const POST_API_URL = 'http://localhost:3000/posts';

  const submitPost: FormEventHandler = (event) => {
    event.preventDefault();

    const title = inputRef.current?.value;
    if (inputRef.current !== null && title) {
      axios
        .post(
          POST_API_URL,
          {
            title,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(() => {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
        })
        .catch(console.error);
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <div>
        <form onSubmit={submitPost}>
          <input ref={inputRef} type='text' name='postText' placeholder='Type something..' />
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
