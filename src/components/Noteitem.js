// This will hold all info of a note i.e title, desc and tag

import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-1">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <i className="fas fa-trash-alt mx-2" onClick={() => {deleteNote(note._id);
                        props.showAlert("Note deleted successfully", "success");
                        }}></i>
                        <i className="fas fa-pencil-alt mx-2" onClick={() => {updateNote(note)}}></i>
                    </div>
            </div>
        </div>
    )
}

export default Noteitem
