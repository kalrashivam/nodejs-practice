fs = require('fs');
os = require('os');
yargs = require('yargs');
const notes = require('./notes.js')

// console.log(process.argv);
// command = process.argv[2];
console.log(yargs.argv);
argv =yargs.argv;
command =argv._[0];
title = argv.title;
body = argv.body

displaynotes =function(notess){
  notess.forEach(function(note){
    console.log('Title: ',note.title , '\n' ,'Body:   ',note.body)
  })
}

if(command == "Add"){
 notes.AddNote(title,body);
}else if (command == "update"){
 notess = notes.updateNotes(title,body);
 displaynotes(notess);
}else if (command == "delete"){
  notess = notes.deleteNotes(title);
  displaynotes(notess);
}else if (command == "list"){
  notess = notes.getAll();
  displaynotes(notess);

}else {
  console.log('enter another command');
}
