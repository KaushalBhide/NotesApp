// All the notes would be displayed in this component

import React from 'react'
import { useContext, useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const ref = useRef(null);
    const refClose = useRef(null);

    let history = useHistory();

    const updateNote = (currentNote) => {
        ref.current.click(); // basically clicking on edit is same as clicking on launch demo modal btn
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        }
        else{
            props.showAlert("First login with proper credentials", "danger");
            history.push("/login")
        }
        // eslint-disable-next-line
    }, [])

    const handleClick = (e) => {
        console.log("Updating the note ", note);
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        props.showAlert("Note updated successfully", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
        // ... is spread operator which sets the input value to their corresponding name i.e set input value of title to "title"
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            {/* Modal */}

            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} value={note.etitle} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} value={note.edescription} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} value={note.etag} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-1">
                    {notes.length === 0 && "No notes to display"}
                </div>
                {/* when there is no else, use && opr */}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                    // note is holding all notes in DB
                })}
            </div>
        </>
    )
}

export default Notes
