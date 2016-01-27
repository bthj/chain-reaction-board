import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Board from './Board';
import Unit from './Unit';
import UnitTypes from './UnitTypes';
import { observe } from './Game';

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      units: [
        // { name: 'Infantry', unittype: UnitTypes.FIXTURE, qty: 10 },
        { name: 'Dwarf', unittype: UnitTypes.CREATURE, qty: 1 },
        { name: 'Elf', unittype: UnitTypes.CREATURE, qty: 1 },
        { name: 'Avatar', unittype: UnitTypes.CREATURE, qty: 1 }
      ],
      knightPosition: [1,7]
    };

    // see: https://github.com/gaearon/react-dnd/blob/master/examples/00%20Chessboard/Tutorial%20App/index.js
    // this.unobserver = observe( this.handleChange.bind(this) );
  }

  // see: https://github.com/gaearon/react-dnd/blob/master/examples/00%20Chessboard/Tutorial%20App/index.js
  // handleChange(knightPosition) {
  //
  //
  //   const nextState = { knightPosition };
  //   if (this.state) {
  //     this.setState(nextState);
  //   } else {
  //     this.state = nextState;
  //   }
  // }

  isDropped( name, index ) { // TODO: change method signature
    return false;
  }

  // renderBoard( knightPosition ) {
  //   console.log("renderBoard");
  //   return (
  //     <Board knightPosition={knightPosition} />
  //   );
  // }

  render() {
    const { units } = this.state;
    const { knightPosition } = this.state;

    return (
      <div>
        <div style={{ overflow: 'hidden', clears: 'both' }}>
          <Board knightPosition={knightPosition} />
        </div>
        <div style={{ overflow: 'hidden', clears: 'both' }}>
          {units.map( ({name, unittype, qty}, index ) =>
            <Unit name={name}
                  unittype={unittype}
                  isDropped={ this.isDropped(name, index) }  // vantar uppá; hringa yfir units, og nested qty
                  key={index} />
          )}
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Container);
