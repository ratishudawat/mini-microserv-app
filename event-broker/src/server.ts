import app from './app';
import http from 'http';
import { config } from 'dotenv';

config();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Event Broker listening on PORT', PORT);
});
