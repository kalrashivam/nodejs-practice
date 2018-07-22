fs = require('fs');

console.log('starting notes.js');

module.exports.work = 'new';

var fetchnotes =function(){
  try{
     read = fs.readFileSync('notes.json');
     oldnotes = JSON.parse(read);
     return oldnotes;
  }catch(e){
     return [];
 }
}

var savenotes = function(notes){
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}



addNote = function(title,body){
  var notes = fetchnotes();
    note = {
        title,
        body
      };
  dublicateresults = notes.filter((note) => note.title === title);

  if(dublicateresults.length === 0){
    notes.push(note);
    savenotes(notes);
    return 'new added';
  }
  return 'enter another value';
}



rmNote = function(title){
      var notes = fetchnotes();
      dublicate = notes.filter((note) => note.title === title);
      if(dublicate.length === 0){
      return 'can"t find node';
    }
    dublicateresults = notes.filter((note) => note.title !== title);
    savenotes(dublicateresults);

      return 'note removed';
}

var getall = (title) => {
    var notes = fetchnotes();
    dublicateresults = notes.filter((note) => note.title === title);
    if(dublicateresults.length == 0){
      console.log('no such node');
    }else{
      console.log(dublicateresults);
    }

}

var update = (title,body) => {
   console.log('updating node  '+title+ 'with '+ body);
}

module.exports ={
 getall,
 addNote,
 rmNote,
 update
}
