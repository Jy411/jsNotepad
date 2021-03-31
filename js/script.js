const saveNoteBtnEl = document.getElementById("saveNoteBtn");
const noteContentInputEl = document.getElementById("noteContentInput");
const noteTitleInputEl = document.getElementById("noteTitleInput");

const noteListEl = document.getElementById("noteList");

let currKey;

<!-- Initialize Quill editor -->
const options = {
  placeholder: 'Compose an epic...',
  theme: 'snow'
};
const quill = new Quill('#noteContentContainer', options);

// Save new note into local storage and reloads page to re-render
const saveNote = () => {
  const noteTitle = noteTitleInputEl.value;
  const noteContent = quill.getContents();

  const newNote = {
    title: noteTitle,
    // content: noteContent,
    content: noteContent
  }

  // If local storage contains key already
  if (localStorage.getItem(currKey) != null) {
    // update note
    localStorage.setItem(currKey, JSON.stringify(newNote));
  } else {
    currKey = "note"+localStorage.length;
    localStorage.setItem(currKey, JSON.stringify(newNote));
  }
  location.reload();
}

const deleteNote = () => {
  if (localStorage.getItem(currKey)) {
    localStorage.removeItem(currKey);
    location.reload();
  }
}

const selectNote = (key) => {
  let currNote = JSON.parse(localStorage.getItem(key.id));
  currKey = key.id;
  noteTitleInputEl.value = currNote.title;
  // noteContentInputEl.value = currNote.content;
  quill.setContents(currNote.content);
  document.getElementById("saveNoteBtn").innerHTML =
  "<i class=\"bi-pencil\"></i>\n" +
      "            <p>Edit Note</p>";
  document.getElementById("deleteNoteBtn").hidden = false;
}

const addNote = () => {
  noteTitleInputEl.value = "New Note Title";
  // noteContentInputEl.value = "Example Content";
  quill.setContents("Add stuff to your note here!");
  currKey = "note"+localStorage.length;
  document.getElementById("saveNoteBtn").innerHTML =
      "<i class=\"bi-save\"></i>\n" +
      "            <p>Save Note</p>";
  document.getElementById("deleteNoteBtn").hidden = false;
}

const downloadFile = () => {
  const downloadURI = (uri, name) => {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
  }

  let fileArr = [];
  let fileContent = "";
  for(let i=0; i < localStorage.length; i++){
    let currNote = localStorage.getItem(localStorage.key(i));
    fileContent += currNote;
  }
  const file = new File(fileArr, "notes.txt", {type: "text/plain"});
  const fileUrl = URL.createObjectURL(file);
  downloadURI(fileUrl, "notes.txt");
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
  quill.setText("Empty");

  // Update character count
  let charCount = 0;
  quill.on(("text-change"), () => {
    charCount = quill.getLength();
    document.getElementById("charCount").innerHTML =
        "<p>Number of Characters: "+ charCount +"</p>"
  })

  // If no key
  if (!localStorage.getItem(currKey)) {
    document.getElementById("deleteNoteBtn").hidden = true;
  }

}
