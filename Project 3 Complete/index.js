const express = require('express');
const port = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

app.get('/', function (req, res) {
  client.get('counter', function(error, data) {
    const counter = parseInt(data) || 0;
    client.set('counter', (counter + 1));
    res.render('index', { counter: counter });
  });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
