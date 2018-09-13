const path = require('path');
var express = require('express');
var hbs = require('handlebars');

app = express();
const publicPath = path.join(__dirname, '../public');
// for heroku
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
app.set('viewengine', 'hbs');

app.get('/', (req,res) => {
  res.render(index.html);
});
app.listen(port, () => {
  console.log('listening at port no. ', port);
});
