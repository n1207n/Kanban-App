import React from 'react';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Lanes from './Lanes.jsx';

import AltContainer from 'alt-container';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {
  render () {
    return (
      <div>
        <button className="add-lane" onClick={this.addLane}>+</button>
        <AltContainer
          stores={[LaneStore]}
          inject={{
            lanes: () => LaneStore.getState().lanes || []
          }}>
          <Lanes />
        </AltContainer>
      </div>
    )
  }

  addLane() {
    LaneActions.create({name: 'New Lane'});
  }
}
