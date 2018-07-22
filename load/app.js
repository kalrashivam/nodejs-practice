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

var argv = Yargs.argv;
command = process.argv[2];

if(command == 'add'){
  addnot = note.addNote(argv.title,argv.body);
  console.log(addnot);
}else if (command == 'rm') {
  note.rmNote(argv.title,argv.body);
}else{
  console.log('command not found');
}
