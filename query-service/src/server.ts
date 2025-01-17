import app, { processEvent } from './app';
import http from 'http';
import dotenv from 'dotenv';
import axios from 'axios';
import { AllEvents } from './types';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`Query service runnning on port ${PORT}`);
  console.log('Fetching events..');

  const { data: events }: { data: AllEvents[] } = await axios.get('http://event-broker-srv:4000/events');

  events.forEach((event: AllEvents) => {
    processEvent(event);
  });

  console.log('Done!!');
});
