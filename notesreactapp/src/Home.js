import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import Constants from './Constants';
import NoteCreateForm from './components/NoteCreateForm';
import NoteUpdateForm from './components/NoteUpdateForm';

export default function Home() {
  const[notes, setNotes] = useState([]);
  const[showingCreateNewNoteForm, setShowingCreateNewNoteForm] = useState(false);
  const[noteCurrentlyBeingUpdated, setNoteCurrentlyBeingUpdated]= useState(null);

  function getNotes(){
      const url = Constants.API_BASE_URL;

    fetch(url,{
      method:'GET'
    })
    .then(response => response.json())
    .then(notesFromServer => {
      setNotes(notesFromServer);
    })
    .catch((error => {
      console.log(error);
      alert(error);
    }));
  }
  
  function deleteNote(noteId) {
      const url = `${Constants.API_BASE_URL}?id=${noteId}`;

    fetch(url, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(responseFromServer => {
          console.log(responseFromServer);
          onNoteDeleted(noteId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="row min-vh-100">
        <div className="col d-flex flex-column justify-content-center align-items-center">
          {(showingCreateNewNoteForm === false && noteCurrentlyBeingUpdated == null) &&(
          <div className="justify-content-center align-items-center">
            <h1>Notes App</h1>
            <div className='btn-group mt-5'>
                <button type="button" onClick={getNotes} className='btn btn-dark btn-sm w-100'>Load Notes</button>
                <button type="button" onClick={() => setShowingCreateNewNoteForm(true)} className='btn btn-success btn-sm w-100'>Create Note</button>
            </div>
          </div>
          )}

          {(notes.length > 0 && showingCreateNewNoteForm === false && noteCurrentlyBeingUpdated == null) && renderNotesTable()}

          {showingCreateNewNoteForm && <NoteCreateForm onNoteCreated={onNoteCreated}/>}

          {noteCurrentlyBeingUpdated !== null && <NoteUpdateForm note={noteCurrentlyBeingUpdated} onNoteUpdated={onNoteUpdated}/>}
        </div>
      </div>
    </div>
  );

  function renderNotesTable(){
    return(
        <div className="table-responsive mt-3">
        <table className="table table-hover border-dark">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {notes.map((note) => (
              <tr key={note.id}>
              <th scope="row">{note.id}</th>
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>
                <button onClick={() => setNoteCurrentlyBeingUpdated(note)} className='btn btn-primary btn-sm mx-3'>Update</button>
                <button onClick={()=> {if(window.confirm(`Are you sure you want to delete note "${note.title}?"`)) deleteNote(note.id)}} className='btn btn-danger btn-sm'>Delete</button>
              </td>
            </tr>
            ))}
          </tbody>
        </table>
        <div>
            <button onClick={() => setNotes([])} className='btn btn-secondary btn-sm w-50'>Clear Notes</button>
        </div>
      </div>
    );
  }

  function onNoteCreated(createdNote){
    setShowingCreateNewNoteForm(false);    
    if (createdNote === null){
      return;
    }

    alert(`Note Successfully Created. Click OK to see the new note "${createdNote.title}" show up in the list.`);

    getNotes();
  }

function onNoteUpdated(updatedNote) {
    setNoteCurrentlyBeingUpdated(null);

    if (updatedNote === null) {
        return;
    }

    let notesCopy = [...notes];

    const index = notesCopy.findIndex((notesCopyPost, currentIndex) => {
        if (notesCopyPost.id === updatedNote.id) {
            return true;
        }
    });

    if (index !== -1) {
        notesCopy[index] = updatedNote;
    }

    setNotes(notesCopy);

    alert(`Note successfully updated. Click OK, to see the Note "${updatedNote.title}" in the list with updates.`);
}

function onNoteDeleted(deletedNoteNoteId) {
    let notesCopy = [...notes];

    const index = notesCopy.findIndex((notesCopyPost, currentIndex) => {
        if (notesCopyPost.id === deletedNoteNoteId) {
            return true;
        }
    });

    if (index !== -1) {
        notesCopy.splice(index, 1);
    }

    setNotes(notesCopy);

    alert(`Note Successfully Deleted.`);
    }
}
