const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('ScreamIt',(text) => {
  return text.toUpperCase();
});

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = '\n' + now + req.method + req.url;
  fs.appendFile('server.json',log, (error) => {
    console.log(error);
  })
  next();
})

app.get('/',function(req,res){
  // res.send('<h2>Hello Express</h2>');
  // res.send({
  //   name: 'Shivam Kalra',
  //   likes: ['eating',
  //       'eating',
  //      'all kinds of stuff'
  //   ]
  // });
  res.render('main.hbs',{
    username: "Shivam",
    pageTitle: "Main",
    // currentYear: new Date().getFullYear()
  })
});

app.get('/about',(req,res) => {
  // res.send('<h2>About Page</h2>');
  res.render('about.hbs', {
    pageTitle: "Checking",
    // currentYear: new Date().getFullYear()
  });
});

app.listen(8080, () => {
  console.log('server up on port 8080');
});
