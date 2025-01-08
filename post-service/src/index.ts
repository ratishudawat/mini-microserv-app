import http from 'http';
import { config } from 'dotenv';
import app from './app';

const server = http.createServer(app);
config();

server.listen(process.env.PORT, () => {
  console.log(`Post service running on port ${process.env.PORT}`);
});
