const express = require('express');

app = express();

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  // res.send('<h2>Hello Express</h2>');
  res.send({
    name: 'Shivam Kalra',
    likes: ['eating',
        'eating',
       'all kinds of stuff'
    ]
  });
});

app.get('/about',(req,res) => {
  res.send('<h2>About Page</h2>');
});

app.listen(3000, () => {
  console.log('server up on port 3000');
});
