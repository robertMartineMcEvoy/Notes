import React, { useState } from 'react'
import Constants from '../Constants'

export default function NoteUpdateForm(props) {
    const initialFormData = Object.freeze({
        title: props.note.title,
        content: props.note.content
    });

    const [formData, setFormData] = useState(initialFormData);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const noteToUpdate = {
            id: props.note.id,
            title: formData.title,
            content: formData.content
        };

        const url = Constants.API_BASE_URL;
        
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteToUpdate)
        })
            .then(response => response.json())
            .then(responseFromServer => {
                console.log(responseFromServer);
            })
            .catch((error) => {
                console.log(error);
            });

        props.onNoteUpdated(noteToUpdate);
    };

    return (
        <form className="w-100 px-5">
            <h1 className="mt-5">Update "{props.note.title}"</h1>
            <div className="mt-5">
                <label className="h3 form-label">Note title</label>
                <input value={formData.title} name="title" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-4">
                <label className="h3 form-label">Note content</label>
                <input value={formData.content} name="content" type="text" className="form-control" onChange={handleChange} />
            </div>
            <div className="mt-2">
                <button onClick={handleSubmit} className="btn btn-success btn-lg w-50 mt-5">Submit</button>
            </div>
            <div className="mt-2">
                <button onClick={() => props.onNoteCreated(null)} className="btn btn-secondary btn-lg w-50 mt-3">Cancel</button>
            </div>
        </form>
    );
}
