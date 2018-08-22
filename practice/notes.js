fs =require('fs')

var savenotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes));
}

var readNotes = () => {
try{  var ret = fs.readFileSync('notes.json')
      return JSON.parse(ret);
    }catch(e){
      return [];
    }
}

var AddNote = (title,body) => {
  obj = {
    title,
    body
  };
  notes = [];
  try{ notes = readNotes();
  }catch(e){
    console.log(e);
  }
  var dublicatenotes = notes.filter((note) => note.title === title);
  if(dublicatenotes.length === 0){
    notes.push(obj);
    savenotes(notes);
    console.log('Note Added');
  }else{
    console.log('enter another title');
  }
}

var getAll = () => {
  notes = readNotes();
  return notes;
}

var deleteNotes = function(title){
  var notes = readNotes();
  var filternotes = notes.filter(function(note){
    if(note.title !== title)
    return note;
  });
  savenotes(filternotes);
  return filternotes;
}

var updateNotes = (title,body) => {
  var notes =readNotes();
  var dublicatenotes = notes.filter((note) => note.title === title);
  if(dublicatenotes.length === 0){
    console.log('no such note');
  }else{
    notes = deleteNotes(title);
    AddNote(title,body);
    notes = readNotes();
    return notes;
  }
}

module.exports = {
  AddNote,
  getAll,
  deleteNotes,
  updateNotes
}
