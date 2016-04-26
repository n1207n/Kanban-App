import React from 'react';

import Note from './Note.jsx';

export default ({notes, onEdit}) => {
  return (
    <ul>
      {notes.map(note =>
        <li key={note.id}>
          <Note task={note.task} onEdit={onEdit.bind(null, note.id)} />
        </li>
      )}
    </ul>
  )
}
