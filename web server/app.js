const express = require('express');

app = express();

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

app.listen(8080);
