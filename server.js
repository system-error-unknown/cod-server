import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import confirmOrderRouter from './api/confirmOrder.js';
import dotenv from 'dotenv';
import https from 'https'; // use https here because your URL is https

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (default)
app.use(cors());

app.use(bodyParser.json());
app.use('/api', confirmOrderRouter);

app.get('/', (req, res) => res.send('stock decrement for toshan bakery API is running'));

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);

  // Self-ping to keep alive every 5 minutes
  setInterval(() => {
    const options = {
      hostname: 'cod-server-ku1n.onrender.com', // NO https:// prefix here
      path: '/',
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      console.log('Self-ping status code: ' + res.statusCode);
    });

    req.on('error', (err) => {
      console.error('Self-ping error: ' + err.message);
    });

    req.end();
  }, 300000); // 5 minutes in ms
});
