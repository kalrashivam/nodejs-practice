const fs = require('fs');


var send = {
  title: "new note",
  body: "trying some json"
};

var sender = JSON.stringify(send);
console.log(sender);

fs.writeFileSync('./notes.json',sender);

var read= fs.readFileSync('./notes.json');
reader = JSON.parse(read);

console.log(typeof reader);
console.log(reader);
