import uuid from 'node-uuid';

import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn Webpack'
        },

        {
          id: uuid.v4(),
          task: 'Learn React'
        },

        {
          id: uuid.v4(),
          task: 'Do laundry'
        },
      ]
    };
  }

  addNote = () => {
    this.setState({notes: [...this.state.notes, {id: uuid.v4(),task: 'New task'}]});
  }

  render () {
    const notes = this.state.notes;

    return (
      <div>

        <button onClick={this.addNote}>+</button>
        <ul>
          {notes.map(note => <li key={note.id}>{note.task}</li>)}
        </ul>
      </div>
    )
  }
}
