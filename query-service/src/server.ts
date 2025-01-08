import app from './app';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Query service runnning on port ${PORT}`);
});
