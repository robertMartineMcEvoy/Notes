import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Constants from './Constants'

export default function ViewNote() {
    const { id } = useParams();
    const[Note, setNote] = useState([]);

    function getNoteById(NoteId){
        const url = `${Constants.API_BASE_URL}/${NoteId}`;
    
        fetch(url,{
          method:'GET'
        })
        .then(response => response.json())
        .then(NoteFromServer => {
            setNote(NoteFromServer);
            console.log(NoteFromServer);
        })
        .catch((error => {
          console.log(error);
          setNote(null)
        }));
      }

    useEffect(() => {
        getNoteById(id)
      }, [])

    return (
        <div className="container">
          <div className="row min-vh-100">
          <div className="col d-flex flex-column justify-content-center align-items-center">  
            {(Note!== null) &&(
                <div className='col d-flex flex-column mt-5'>
                <h1>{Note.title}</h1>
                <p>{Note.content}</p>
                </div>
            )}
            {(Note === null) && (
                <h1>Sorry, Note {id} Does Not Exist</h1>
            )}
            </div>    
          </div>
        </div>
    );
}
