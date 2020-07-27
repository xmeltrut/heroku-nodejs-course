const express = require('express');
const fs = require('fs');
const port = process.env.PORT;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  const bikesJson = fs.readFileSync('data/bikes.json');
  const bikes = JSON.parse(bikesJson);
  res.render('index', { bikes: bikes });
});

app.get('/details/:id', function (req, res) {
  const bikesJson = fs.readFileSync('data/bikes.json');
  const bikes = JSON.parse(bikesJson);
  const bike = bikes.find(function(element) { return element.id == req.params.id; });
  if (bike === undefined) { throw 'Bike cannot be found'; }
  res.render('details', { bike: bike });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
