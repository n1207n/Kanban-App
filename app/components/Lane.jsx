import AltContainer from 'alt-container';
import React from 'react';

import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';

import Editable from './Editable.jsx';

import LaneActions from '../actions/LaneActions';

export default class Lane extends React.Component {
  render() {
    const {lane, ...props} = this.props;

    return (
      <div {...props}>
        <div className="lane-header" onClick={this.activateLaneEdit}>
          <div className="lane-add-note">
            <button onClick={this.addNote}>+</button>
          </div>

          <Editable className="lane-name" editing={lane.editing}
            value={lane.name} onEdit={this.editName}>
            <div className="lane-delete">
              <button onClick={this.deleteLane}>x</button>
            </div>
          </Editable>
        </div>

        <AltContainer
          stores={[NoteStore]}
          inject={{
            notes: () => NoteStore.getNotesByIds(lane.notes)
          }}>
          <Notes
            onValueClick={this.activateNoteEdit}
            onEdit={this.editNote}
            onDelete={this.deleteNote} />
        </AltContainer>
      </div>
    )
  }

  editNote(id, task) {
    if(!task.trim()) {
      NoteActions.update({id, editing: false});
      return;
    }

    NoteActions.update({id, task, editing: false});
  }

  addNote = (e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;
    const note = NoteActions.create({task: 'New task'});

    LaneActions.attachToLane({
      noteId: note.id,
      laneId
    });
  }

  deleteNote = (noteId, e) => {
    e.stopPropagation();

    const laneId = this.props.lane.id;

    LaneActions.detachFromLane({laneId, noteId});
    NoteActions.delete(noteId);
  }

  editName = (name) => {
    const laneId = this.props.lane.id;

    if(!name.trim()) {
      LaneActions.update({id: laneId, editing: false});
      return;
    }

    LaneActions.update({id: laneId, name, editing: false});
  }

  deleteLane = () => {
    const laneId = this.props.lane.id;

    LaneActions.delete(laneId);
  }

  activateLaneEdit = () => {
    const laneId = this.props.lane.id;

    LaneActions.update({id: laneId, editing: true});
  }

  activateNoteEdit = (id) => {
    NoteActions.update({id, editing: true});
  }
}
