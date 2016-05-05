import React from 'react';

import Notes from './Notes.jsx';

import AltContainer from 'alt-container';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

export default class App extends React.Component {
  render () {
    return (
      <div>
        <button className="add-note" onClick={this.addNote}>+</button>
        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getState().notes
          }}>
          <Notes onEdit={this.editNote} onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  addNote = () => {
    NoteActions.create({task: 'New Task'});
  }

  editNote = (id, task) => {
    if(!task.trim()) {
      return;
    }

    NoteActions.update({id, task});
  }

  deleteNote = (id, e) => {
    e.stopPropagation();
    NoteActions.delete(id);
  }
}
