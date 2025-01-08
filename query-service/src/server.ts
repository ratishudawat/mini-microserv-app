import app, { processEvent } from './app';
import http from 'http';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

type Event = {
  type: 'POST_CREATED' | 'COMMENT_CREATED';
  payload: any;
};
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Query service runnning on port ${PORT}`);
  console.log('Fetching events..');

  const { data: events }: { data: Event[] } = await axios.get('http://localhost:4000/events');

  events.forEach((event: Event) => {
    processEvent(event);
  });

  console.log('Done!!');
});
