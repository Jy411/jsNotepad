const saveNoteBtnEl = document.getElementById("saveNoteBtn");
const noteContentInputEl = document.getElementById("noteContentInput");
const noteTitleInputEl = document.getElementById("noteTitleInput");

const noteListEl = document.getElementById("noteList");

let currKey;

// Save new note into local storage and reloads page to re-render
const saveNote = () => {
  const noteTitle = noteTitleInputEl.value;
  const noteContent = noteContentInputEl.value;

  const newNote = {
    title: noteTitle,
    content: noteContent
  }

  console.log("saveNote");
  console.log("currKey");
  console.log(currKey);

  // If local storage contains key already
  if (localStorage.getItem(currKey) != null) {
    // update note
    console.log("key here");
    console.log("currKey");
    console.log(currKey);
    localStorage.setItem(currKey, JSON.stringify(newNote));
  } else {
    console.log("key NOT here");
    console.log("currKey");
    console.log(currKey);
    currKey = "note"+localStorage.length;
    localStorage.setItem(currKey, JSON.stringify(newNote));
  }
  location.reload();
}

const selectNote = (key) => {
  let currNote = JSON.parse(localStorage.getItem(key.id));
  currKey = key.id;
  noteTitleInputEl.value = currNote.title;
  noteContentInputEl.value = currNote.content;
  document.getElementById("saveNoteBtn").innerHTML =
  "<i class=\"bi-save\"></i>\n" +
      "            <p>Edit Note</p>";
}

const addNote = () => {
  noteTitleInputEl.value = "New Note Title";
  noteContentInputEl.value = "Example Content";
  currKey = "note"+localStorage.length;
  document.getElementById("saveNoteBtn").innerHTML =
      "<i class=\"bi-save\"></i>\n" +
      "            <p>Save Note</p>";
}

window.onload = () => {
  // Loops through local storage and adds list of notes to sidebar
  for(let i=0; i < localStorage.length; i++){
    let currNote = JSON.parse(localStorage.getItem(localStorage.key(i)));
    let title = currNote.title;
    let noteKey = localStorage.key(i);
    noteListEl.innerHTML +=
        "<div class='note' onclick=selectNote(" + noteKey + ") id=" + noteKey + ">" +
        "<i class='bi-circle'></i><p>" + title + "</p></div>";
  }
  noteTitleInputEl.value = "Empty";
  noteContentInputEl.value = "Empty";
}
