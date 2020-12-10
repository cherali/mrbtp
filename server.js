const cors = require('cors');
const next = require('next');
const Pusher = require('pusher');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const serverCall = require('./common/network/serverCall');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({ dev });
const handler = app.getRequestHandler();

// Ensure that your pusher credentials are properly set in the .env file
// Using the specified variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: process.env.USE_TLS
});


const heahers = {
  'User-Agent': 'Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36'
}


app.prepare()
  .then(() => {

    const server = express();

    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.get('*', (req, res) => {
      return handler(req, res);
    });

    server.post('/coins-list', async (req, res) => {
      const trigger = d => pusher.trigger('coins-list', 'coin-price', d)

      // setInterval(async() => {
        const resp = await serverCall({
          method: 'get',
          url: 'https://mrbitex.net/api/v1/general/currency/coin/list',
          lang: req.body.lang,
          headerParams: heahers,
          cb: trigger
        })
        res.json({ message: 'success', status: 200, data: resp })
      // }, 1000);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });

  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });