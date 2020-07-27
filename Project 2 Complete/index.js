const express = require('express');
const port = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', { country: process.env.COUNTRY })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
