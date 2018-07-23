console.log('staring node');

const _ = require('lodash');
os =  require('os');
fs = require('fs');
const note = require('./notes.js');
const Yargs =require('yargs');

// var a = [1,3,54,67,3,5,7,5,54];
// var user =os.userInfo();
// console.log(_.isString('chutiya'));
// var n_arr = _.uniq(a);
// fs.appendFile('greetings.txt','hello ' +user.username+ note.work);
// console.log(n_arr);
// res = note.addNote();
// console.log(res);

var argv = Yargs
.command('add','add a new note',
{ title: {
  describe: "enter the title of the note",
  demand: true,
  alias: 't'
}

})
.help()
.argv;
// console.log(process.argv);
command = process.argv[2];

if(command == 'add'){
  addnot = note.addNote(argv.title,argv.body);
  console.log(addnot);
}else if (command == 'rm') {
  rmnote= note.rmNote(argv.title);
  console.log(rmnote);
}else if(command == 'get'){
  note.getall(argv.title);
}else if(command == 'update'){
  note.update(argv.title,argv.body);
}else {
  console.log('command not found');
}
