fs = require('fs');

console.log('starting notes.js');

module.exports.work = 'new';



module.exports.addNote = function(title,body){
  var notes = [];
    note = {
        title,
        body
      };


   try{
      read = fs.readFileSync('notes.json');
      oldnotes = JSON.parse(read);
      notes = oldnotes;
   }catch(e){
      console.log(e);
  }

  dublicateresults = notes.filter((note) => note.title === title);

  if(dublicateresults.length === 0){
    notes.push(note);
    fs.writeFileSync('notes.json', JSON.stringify(notes));
    return 'new added';
  }

    return 'enter another value';
}



module.exports.rmNote = function(title,body){
      console.log('removing note....',title,body);
      return 'note removed';
}
